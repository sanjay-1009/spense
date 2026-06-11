const db = require("../config/db");
const ExcelJS = require("exceljs");

// Get All Users
const getAllUsers = (req, res) => {

    const sql = `
        SELECT
        id,
        name,
        email,
        role,
        last_active,
        created_at
        FROM users
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Export Single User Expenses
const exportUserExpenses = async (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM expenses
        WHERE user_id = ?
        ORDER BY expense_date
    `;

    db.query(sql, [id], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        const workbook = new ExcelJS.Workbook();

        const worksheet =
            workbook.addWorksheet("Expenses");

        worksheet.columns = [

            { header: "Date", key: "expense_date", width: 20 },

            { header: "Food", key: "food", width: 15 },

            { header: "Travel", key: "travel", width: 15 },

            { header: "College", key: "clg", width: 15 },

            { header: "Misc", key: "misc", width: 15 },

            { header: "Total", key: "total", width: 15 }

        ];

        worksheet.addRows(result);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=user_${id}_expenses.xlsx`
        );

        await workbook.xlsx.write(res);

        res.end();

    });

};

const exportMonthReport = async (req, res) => {

    const { year, month } = req.params;

    const sql = `
        SELECT *
        FROM expenses
        WHERE YEAR(expense_date)=?
        AND MONTH(expense_date)=?
    `;

    db.query(
        sql,
        [year, month],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            const workbook = new ExcelJS.Workbook();

            const worksheet =
                workbook.addWorksheet("Monthly Report");

            worksheet.columns = [

                { header: "User ID", key: "user_id", width: 15 },

                { header: "Date", key: "expense_date", width: 20 },

                { header: "Food", key: "food", width: 15 },

                { header: "Travel", key: "travel", width: 15 },

                { header: "College", key: "clg", width: 15 },

                { header: "Misc", key: "misc", width: 15 },

                { header: "Total", key: "total", width: 15 }

            ];

            worksheet.addRows(result);

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename=${year}_${month}_report.xlsx`
            );

            await workbook.xlsx.write(res);

            res.end();

        }
    );
};

module.exports = {
    getAllUsers,
    exportUserExpenses,
    exportMonthReport
};