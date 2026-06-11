const db = require("../config/db");

const getDashboardStats = (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT

        IFNULL(
            SUM(
                CASE
                WHEN expense_date = CURDATE()
                THEN total
                END
            ),0
        ) AS todaySpend,

        IFNULL(
            ROUND(AVG(total),2),0
        ) AS dailyAverage,

        IFNULL(
            ROUND(
                (
                    SELECT AVG(total)
                    FROM expenses
                    WHERE user_id=?
                    AND YEARWEEK(expense_date)=YEARWEEK(CURDATE())
                ),2
            ),0
        ) AS weeklyAverage,

        IFNULL(
            ROUND(
                (
                    SELECT AVG(total)
                    FROM expenses
                    WHERE user_id=?
                    AND MONTH(expense_date)=MONTH(CURDATE())
                    AND YEAR(expense_date)=YEAR(CURDATE())
                ),2
            ),0
        ) AS monthlyAverage,

        COUNT(*) AS expenseCount

        FROM expenses

        WHERE user_id=?
    `;

    db.query(
        sql,
        [userId, userId, userId],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(result[0]);

        }
    );
};

const getChartData = (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT
            expense_date,
            total
        FROM expenses
        WHERE user_id = ?
        ORDER BY expense_date ASC
    `;

    db.query(sql,[userId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);
    });

};

const getCategoryChart = (req,res)=>{

    const { userId } = req.params;

    const sql = `
        SELECT
        SUM(food) food,
        SUM(travel) travel,
        SUM(clg) clg,
        SUM(misc) misc
        FROM expenses
        WHERE user_id=?
    `;

    db.query(sql,[userId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};

module.exports = {
    getDashboardStats,getChartData,getCategoryChart
};