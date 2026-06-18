const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();
const authRoutes = require("./routes/authRoutes");
const expenseRoutes =require("./routes/expenseRoutes");
const reportRoutes =require("./routes/reportRoutes");
const adminRoutes =require("./routes/adminRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");
const testMailRoute =require("./routes/testMailRoute");
const otpRoutes =require("./routes/otpRoutes");
const passwordRoutes =require("./routes/passwordRoutes");

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/auth",authRoutes);

app.use("/api/expense",expenseRoutes);

app.use("/api/report",reportRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/dashboard",dashboardRoutes);

app.use("/test-mail",testMailRoute);

app.use("/api/otp",otpRoutes);

app.use("/api/password",passwordRoutes);

app.get("/", (req, res) => {

    res.send("Spense Backend Running 🚀");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});