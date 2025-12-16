function calculateRental(days) {
  if (typeof days !== "number" || days < 0) {
    throw new Error("Days must be a positive number");
  }

  const basePrice = 5;
  const dailyPrice = 1;

  if (days <= 0) return basePrice;

  return basePrice + dailyPrice * days;
}

function calculateFine(daysLate) {
  const dailyFine = 2;

  if (daysLate <= 0) return 0;

  return daysLate * dailyFine;
}

function applyFirstDelayDiscount(fine) {
  return fine * 0.5;
}

module.exports = {
  calculateRental,
  calculateFine,
  applyFirstDelayDiscount,
};
