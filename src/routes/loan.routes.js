const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/loans', authMiddleware, loanController.createLoan);
router.get('/loans/:id', authMiddleware, loanController.getLoan);
router.get('/loans/:id/rental', authMiddleware, loanController.getRentalValue);
router.get('/loans/:id/fine', authMiddleware, loanController.getFineValue);


module.exports = router;
