const TicketsModel = require("../models/ticket.model");

class TicketRepository {
  CreateTicket = async (payload) => {
    const ticket = await TicketsModel.create(payload);
    return ticket;
  };

  GetTickets = async () => {
    const Tickets = await TicketsModel.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                phone_number: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movies",
          foreignField: "_id",
          as: "movies",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          movies: 1,
          user: {
            $arrayElemAt: ["$user", 0],
          },
          price: 1,
          time_booked: 1,
        },
      },
    ]);
    return Tickets;
  };
  GetTicketById = async (id) => {
    const [ticket] = await TicketsModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ toString: "_id" }, id],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movies",
          foreignField: "_id",
          as: "movies",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
        },
      },
    ]);
    return ticket;
  };
}

const ticketRepo = new TicketRepository();

module.exports = ticketRepo;
