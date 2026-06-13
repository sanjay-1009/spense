const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check if email already exists
        const checkSql =
            "SELECT * FROM users WHERE email=?";

        db.query(
            checkSql,
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {

                    return res.status(400).json({
                        message: "Email already exists"
                    });

                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                const sql =
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)";

                db.query(
                    sql,
                    [name, email, hashedPassword],
                    (err, result) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "User Registered Successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};

const login = (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result[0];

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            "spense_secret",
            {
                expiresIn: "1d"
            }
        );

        res.json({
    message: "Login Successful",
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
    });

};

module.exports = {
    register,
    login
};