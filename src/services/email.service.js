const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (ticket) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: `${ticket.user.phone_number}@gmail.com`,
    subject: "Ticket Booking Confirmation",
    text: `Your ticket for ${ticket.movies[0].name} has been booked successfully.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
