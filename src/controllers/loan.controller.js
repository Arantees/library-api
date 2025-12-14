const loanService = require("../services/loan.service");

function createLoan(req, res) {
  const { userName, bookTitle, days } = req.body;

  if (!userName || !bookTitle || !days) {
    return res.status(400).json({ message: "Missing data" });
  }

  const loan = loanService.createLoan({
    userName,
    bookTitle,
    days,
  });

  return res.status(201).json(loan);
}

function getLoan(req, res) {
  const loan = loanService.findLoanById(req.params.id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  return res.json(loan);
}

module.exports = {
  createLoan,
  getLoan,
};
