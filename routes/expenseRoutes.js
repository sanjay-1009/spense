

const express = require("express");

const router = express.Router();

const {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,getUserExpenses
} = require("../controllers/expenseController");

router.post("/add", addExpense);

router.get("/all", getAllExpenses);

router.put("/update/:id", updateExpense);

router.delete("/delete/:id", deleteExpense);

router.post("/add",addExpense);

router.get("/user/:userId",getUserExpenses);





module.exports = router;