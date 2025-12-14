const loans = [];

function createLoan({ userName, bookTitle, days }) {
  const loanDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(loanDate.getDate() + days);

  const loan = {
    id: loans.length + 1,
    userName,
    bookTitle,
    loanDate,
    dueDate,
    returnedAt: null,
  };

  loans.push(loan);
  return loan;
}

function findLoanById(id) {
  return loans.find((loan) => loan.id === Number(id));
}

module.exports = {
  createLoan,
  findLoanById,
};
