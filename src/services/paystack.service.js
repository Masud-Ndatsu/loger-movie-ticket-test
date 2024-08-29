const axios = require("axios");

const processPayment = async ({
  amount,
  email,
  ticket_id,
  user_id,
  reference,
}) => {
  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      amount: amount * 100,
      email: email ?? "customer@example.com",
      reference,
      metadata: {
        ticket_id,
        user_id,
        email,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  return response.data;
};

module.exports = { processPayment };
