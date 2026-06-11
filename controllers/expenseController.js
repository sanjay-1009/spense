const db = require("../config/db");



// Add Expense
const addExpense =
(req,res)=>{

    const {
        user_id,
        expense_date,
        food,
        travel,
        clg,
        misc
    } = req.body;

    const total =
        Number(food) +
        Number(travel) +
        Number(clg) +
        Number(misc);

    const sql = `
        INSERT INTO expenses
        (
            user_id,
            expense_date,
            food,
            travel,
            clg,
            misc,
            total
        )
        VALUES (?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            user_id,
            expense_date,
            food,
            travel,
            clg,
            misc,
            total
        ],
        (err,result)=>{

            if(err){

                return res
                .status(500)
                .json(err);

            }

            res.json({

                message:
                "Expense Added",

                total

            });

        }
    );
};

// Get All Expenses
const getAllExpenses = (req, res) => {

    const sql = `
        SELECT *
        FROM expenses
        ORDER BY expense_date DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });
};

// Update Expense
const updateExpense = (req, res) => {

    const { id } = req.params;

    const {
        food,
        travel,
        clg,
        misc
    } = req.body;

    const total =
        Number(food || 0) +
        Number(travel || 0) +
        Number(clg || 0) +
        Number(misc || 0);

    const sql = `
        UPDATE expenses
        SET food=?,
            travel=?,
            clg=?,
            misc=?,
            total=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            food,
            travel,
            clg,
            misc,
            total,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Expense Updated Successfully"
            });

        }
    );
};

// Delete Expense
const deleteExpense = (req, res) => {

    const { id } = req.params;

    const sql =
        "DELETE FROM expenses WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Expense Deleted Successfully"
        });

    });
};

const getUserExpenses = (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT *
        FROM expenses
        WHERE user_id = ?
        ORDER BY expense_date DESC
    `;

    db.query(
        sql,
        [userId],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};



module.exports = {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,getUserExpenses
};