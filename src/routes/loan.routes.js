const express = require("express");
const router = express.Router();

const loanController = require("../controllers/loan.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/loans", authenticate, loanController.createLoan);
router.get("/loans/:id", loanController.getLoan);
router.get("/loans/:id/rental", authenticate, loanController.getRentalValue);
router.get("/loans/:id/fine", authenticate, loanController.getFineValue);

module.exports = router;
