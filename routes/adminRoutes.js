const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    exportUserExpenses,exportMonthReport, getAdminStats,deleteUser,exportAllUsers
} = require("../controllers/adminController");

router.get("/users", getAllUsers);

router.get(
"/export-all-users",
exportAllUsers
);

router.get(
    "/export-user/:id",
    exportUserExpenses
);

router.get(
    "/export-month/:year/:month",
    exportMonthReport
);

router.get(
"/stats",
getAdminStats
);

router.delete(
"/user/:id",
deleteUser
);


module.exports = router;