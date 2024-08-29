const paystackService = require("../services/paystack.service");
const movieRepo = require("../repository/movie.repository");
const ticketRepo = require("../repository/ticket.repository");
const { ticketValidationSchema } = require("../utils/validations/ticket");
const { formatValidationErrorMessage } = require("../utils/formater");

const bookTicket = async (req, res) => {
  const user = req.user;
  const { movieIds } = req.body;

  try {
    const { error } = ticketValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        data: null,
        message: formatValidationErrorMessage(error.message),
      });
    }

    const movies = await movieRepo.GetMoviesById(movieIds);

    console.log({ movies, user });

    if (!user || movies.length === 0) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Invalid user or movies",
      });
    }

    const price = movies.reduce(
      (prev, curr) => prev + Number(curr.price.replace("NGN", "")),
      0
    );

    const ticket = await ticketRepo.CreateTicket({
      user: user._id,
      movies: movieIds,
      price: `${price}NGN`,
    });

    const paymentResponse = await paystackService.processPayment({
      amount: price,
      email: user.email,
      ticket_id: ticket._id,
      user_id: user._id,
    });

    return res.status(200).json({
      status: true,
      data: paymentResponse,
      message: "Ticket booked successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: true,
      data: null,
      message: "Error booking ticket " + error.message,
    });
  }
};

module.exports = { bookTicket };
