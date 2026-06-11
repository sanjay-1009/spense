const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    exportUserExpenses,exportMonthReport
} = require("../controllers/adminController");

router.get("/users", getAllUsers);

router.get(
    "/export-user/:id",
    exportUserExpenses
);

router.get(
    "/export-month/:year/:month",
    exportMonthReport
);

module.exports = router;