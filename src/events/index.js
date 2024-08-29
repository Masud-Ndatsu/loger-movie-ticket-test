import { sendConfirmationEmail } from "../services/email.service";

const EventEmitter = require("eventemitter3");
const ticketRepo = require("../repository/ticket.repository");
const { sendWebhook } = require("../services/webhook.service");

class EventService extends EventEmitter {
  constructor() {
    super();
    console.log("EventEmitter initialized!");
    this.on("welcome", this.handleWelcome);
    this.on("payment.success", this.handlePaymentProcess);
  }

  handleWelcome(event) {
    console.log(event);
  }
  handleOrderPaymentProcess = async (data) => {
    try {
      const metadata = data.metadata;
      const data = data;
      const ticket_id = metadata.ticket_id;

      const ticket = await ticketRepo.GetTicketById(ticket_id);

      await sendWebhook(ticket);
      await sendConfirmationEmail(ticket);
    } catch (error) {
      console.error("Error updating order items:", error);
    }
  };
}
const eventEmitter = new EventService();

export default eventEmitter;
