const calculationService = require('../src/services/calculation.service');

describe('Calculation Service', () => {
  test('should calculate rental value correctly', () => {
    const days = 10;
    const value = calculationService.calculateRental(days);

    expect(value).toBe(15);
  });

  test('should calculate fine correctly', () => {
    const daysLate = 3;
    const fine = calculationService.calculateFine(daysLate);

    expect(fine).toBe(6);
  });

  test('should apply 50% discount on fine', () => {
    const fine = 10;
    const discountedFine = calculationService.applyFirstDelayDiscount(fine);

    expect(discountedFine).toBe(5);
  });
});
