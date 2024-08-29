function generateTransactionRef() {
  const initials = "loger";

  // Get current date and time
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Generate a random number for uniqueness
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  // Combine all parts into the transaction reference
  const transactionRef = `${initials}-${year}${month}${day}-${hours}${minutes}${seconds}-${randomNumber}`;

  return transactionRef;
}

module.exports = { generateTransactionRef };
