const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/loans', authMiddleware, loanController.createLoan);
router.get('/loans/:id', authMiddleware, loanController.getLoan);

module.exports = router;
