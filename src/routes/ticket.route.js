const express = require("express");
const { bookTicket } = require("../controllers/ticket.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/book", authenticate, bookTicket);

module.exports = router;
