const express = require("express");
require("dotenv/config");
const connectDB = require("./config/db");
const ticketRoutes = require("./routes/ticket.route");
const userRoutes = require("./routes/user.route");
const movieRoutes = require("./routes/movie.route");
const { default: axios } = require("axios");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/movies", movieRoutes);

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API_URL = "https://api.paystack.co";

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Loger Movie Ticket API",
  });
});

app.post("/webhook/paystack", async (req, res) => {
  // Verify that the request is coming from Paystack
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Unauthorized");
  }

  const { reference } = req.body.data;

  try {
    // Verify the transaction with Paystack
    const verificationUrl = `${PAYSTACK_API_URL}/transaction/verify/${reference}`;
    const { data } = await axios.get(verificationUrl, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    if (data.status && data.data.status === "success") {
      // Process the successful transaction
      const transactionDetails = data.data;
      if (metadata && metadata.ticket_id) {
        eventEmitter.emit("welcome", transactionDetails);
        eventEmitter.emit("payment.success", transactionDetails);
      }

      return res
        .status(200)
        .send("Transaction verified and processed successfully");
    } else {
      // Handle failed transaction
      res.status(400).send("Transaction verification failed");
    }
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
