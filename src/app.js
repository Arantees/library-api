const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando " });
});

const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const loanRoutes = require('./routes/loan.routes')

app.use(authRoutes);
app.use(protectedRoutes);
app.use(loanRoutes)

module.exports = app;
