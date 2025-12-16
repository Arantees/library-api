const loanService = require("../services/loan.service");
const calculationService = require("../services/calculation.service");
const userService = require("../services/user.service");

function createLoan(req, res) {
  const { userId, bookTitle, days } = req.body;

  if (!userId || !bookTitle || !days) {
    return res.status(400).json({ message: "Missing data" });
  }

  const user = userService.findUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const loan = loanService.createLoan({
    userId,
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

function listLoansByUser(req, res) {
  const userId = Number(req.params.id);

  const loans = loanService.findLoansByUserId(userId);

  return res.json(loans);
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
    return res.json({
      status: "No prazo",
      fine: 0,
    });
  }

  const daysLate = Math.ceil((today - loan.dueDate) / (1000 * 60 * 60 * 24));

  let fine = calculationService.calculateFine(daysLate);

  if (!loan.hasLateBefore) {
    fine = calculationService.applyFirstDelayDiscount(fine);
    loan.hasLateBefore = true;
  }

  return res.json({
    status: "Atrasado",
    daysLate,
    fine,
  });
}

module.exports = {
  createLoan,
  getLoan,
  getRentalValue,
  getFineValue,
  listLoansByUser,
};
