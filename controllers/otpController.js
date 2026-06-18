const db = require("../config/db");
const axios = require("axios");

// Send OTP Email using Brevo API
const sendBrevoEmail = async (email, otp) => {

```
await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
        sender: {
            name: "Spense",
            email: process.env.BREVO_EMAIL
        },

        to: [
            {
                email: email
            }
        ],

        subject: "Spense Email Verification",

        htmlContent: `
```

<div style="font-family:Arial;padding:20px">

<h2>Spense Email Verification</h2>

<p>Hello User,</p>

<p>Your OTP is:</p>

<h1 style="color:#206bc4">
${otp}
</h1>

<p>
This OTP is valid for 2 minutes.
</p>

<p>
Do not share this OTP with anyone.
</p>

<hr>

<p>
Spense Expense Tracker
</p>

</div>
`
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );
};

// Generate OTP + Save + Send Email
const generateAndSendOtp = (email, res) => {

```
const otp =
    Math.floor(
        100000 + Math.random() * 900000
    ).toString();

const expiresAt =
    new Date(
        Date.now() + 2 * 60 * 1000
    );

db.query(
    "DELETE FROM email_otps WHERE email=?",
    [email]
);

const sql =
    "INSERT INTO email_otps(email,otp,expires_at) VALUES(?,?,?)";

db.query(
    sql,
    [email, otp, expiresAt],
    async (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        try {

            await sendBrevoEmail(
                email,
                otp
            );

            res.json({
                message: "OTP Sent Successfully"
            });

        }
        catch (error) {

            console.log(
                "MAIL ERROR:",
                error.response?.data || error
            );

            res.status(500).json({
                message:
                    "Email Sending Failed"
            });

        }

    }
);
```

};

// REGISTER OTP
const sendRegisterOtp = (req, res) => {

```
const { email } = req.body;

const sql =
    "SELECT * FROM users WHERE email=?";

db.query(
    sql,
    [email],
    (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {

            return res.status(400).json({
                message:
                    "Email already registered"
            });

        }

        generateAndSendOtp(
            email,
            res
        );

    }
);
```

};

// FORGOT PASSWORD OTP
const sendResetOtp = (req, res) => {

```
const { email } = req.body;

const sql =
    "SELECT * FROM users WHERE email=?";

db.query(
    sql,
    [email],
    (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(404).json({
                message:
                    "Email not registered"
            });

        }

        generateAndSendOtp(
            email,
            res
        );

    }
);
```

};

// VERIFY OTP
const verifyOtp = (req, res) => {

```
const { email, otp } = req.body;

const sql = `
    SELECT *
    FROM email_otps
    WHERE email=?
    AND otp=?
    AND expires_at > NOW()
    ORDER BY id DESC
    LIMIT 1
`;

db.query(
    sql,
    [email, otp],
    (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(400).json({
                message:
                    "Invalid or Expired OTP"
            });

        }

        db.query(
            "UPDATE email_otps SET verified=TRUE WHERE email=?",
            [email]
        );

        res.json({
            message:
                "OTP Verified"
        });

    }
);
```

};

module.exports = {
sendRegisterOtp,
sendResetOtp,
verifyOtp
};
