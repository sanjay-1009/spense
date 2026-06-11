const express = require("express");

const router = express.Router();

const {
    getDailyAverage,
    getMonthlyAverage,
    getTodaySpend
} = require("../controllers/reportController");

router.get("/daily-average", getDailyAverage);

router.get("/monthly-average", getMonthlyAverage);

router.get("/today-spend", getTodaySpend);

module.exports = router;