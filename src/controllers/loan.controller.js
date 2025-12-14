const loanService = require("../services/loan.service");
const calculationService = require("../services/calculation.service");

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

function getRentalValue(req, res) {
  const loan = loanService.findLoanById(req.params.id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  const value = calculationService.calculateRental(loan.days);

  return res.json({ rentalValue: value });
}

function getFineValue(req, res) {
  const loan = loanService.findLoanById(req.params.id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  const today = new Date();

  if (today <= loan.dueDate) {
    return res.json({ fine: 0 });
  }

  const daysLate = Math.ceil((today - loan.dueDate) / (1000 * 60 * 60 * 24));

  let fine = calculationService.calculateFine(daysLate);

  if (!loan.hasLateBefore) {
    fine = calculationService.applyFirstDelayDiscount(fine);
    loan.hasLateBefore = true;
  }

  return res.json({ fine });
}

module.exports = {
  createLoan,
  getLoan,
  getRentalValue,
  getFineValue,
};
