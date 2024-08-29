const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
  ],
  price: {
    type: String,
    required: true,
  },
  time_booked: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tickets", TicketSchema);
