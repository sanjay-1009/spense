const db = require("../config/db");

// Daily Average
const getDailyAverage = (req, res) => {

    const sql = `
        SELECT ROUND(AVG(total),2) AS dailyAverage
        FROM expenses
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};

// Monthly Average
const getMonthlyAverage = (req, res) => {

    const sql = `
        SELECT
        MONTH(expense_date) AS month,
        ROUND(AVG(total),2) AS average
        FROM expenses
        GROUP BY MONTH(expense_date)
        ORDER BY month
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Today's Spend
const getTodaySpend = (req, res) => {

    const sql = `
        SELECT
        ROUND(SUM(total),2) AS todaySpend
        FROM expenses
        WHERE expense_date = CURDATE()
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};

module.exports = {
    getDailyAverage,
    getMonthlyAverage,
    getTodaySpend
};