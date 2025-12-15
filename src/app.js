const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "API funcionando " });
});

const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const loanRoutes = require("./routes/loan.routes");
const userRoutes = require("./routes/user.routes");

app.use(authRoutes);
app.use(protectedRoutes);
app.use(loanRoutes);
app.use(userRoutes);

module.exports = app;
