const express = require("express");

const router = express.Router();

const {getDashboardStats,getChartData, getCategoryChart} = require("../controllers/dashboardController");



router.get(
    "/stats/:userId",
    getDashboardStats
);

router.get(
    "/chart/:userId",
    getChartData
);

router.get(
"/category-chart/:userId",getCategoryChart
);

module.exports = router;