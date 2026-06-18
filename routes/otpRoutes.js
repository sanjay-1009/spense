const express = require("express");

const router = express.Router();

const {
    sendRegisterOtp,
    sendResetOtp,
    verifyOtp
} = require("../controllers/otpController");

// Registration OTP
router.post(
    "/register",
    sendRegisterOtp
);

// Forgot Password OTP
router.post(
    "/reset",
    sendResetOtp
);

// Verify OTP
router.post(
    "/verify",
    verifyOtp
);

module.exports = router;