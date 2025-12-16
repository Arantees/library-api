let loans = [];
let nextId = 1;

function createLoan({ userId, bookTitle, days }) {
  const loanDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(loanDate.getDate() + days);

  const loan = {
    id: nextId++,
    userId,
    bookTitle,
    days,
    loanDate,
    dueDate,
    returnedAt: null,
    hasLateBefore: false,
  };

  loans.push(loan);
  return loan;
}

function findLoanById(id) {
  return loans.find((loan) => loan.id === Number(id));
}
function findLoansByUserId(userId) {
  return loans.filter((loan) => loan.userId === userId);
}

function returnLoan(id) {
  const loan = loans.find((l) => l.id === Number(id));

  if (!loan) return null;

  loan.returnedAt = new Date();
  return loan;
}

module.exports = {
  createLoan,
  findLoanById,
  returnLoan,
  findLoanById,
  findLoansByUserId,
};
