const transactionsModel = require("../models/transaction.model");

class TransactionsRepository {
  Create = async (payload) => {
    const transaction = await transactionsModel.create(payload);
    return transaction;
  };
  getPending = async ({ id, status }) => {
    const transaction = await transactionsModel.findOne({ _id: id, status });
    return transaction;
  };
}

const transactionRepo = new TransactionsRepository();

module.exports = transactionRepo;
