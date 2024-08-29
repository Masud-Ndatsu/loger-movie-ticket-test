const axios = require("axios");

const sendWebhook = async (ticket) => {
  const webhookPayload = {
    ticket_id: ticket._id,
    price: ticket.price,
    movies: ticket.movies,
    user: ticket.user,
    time_booked: ticket.time_booked,
  };

  await axios.post("/api/webhook/paystack", webhookPayload);
};

module.exports = { sendWebhook };
