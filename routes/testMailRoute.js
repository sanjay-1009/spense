const express = require("express");

const router = express.Router();

const transporter =
require("../services/mailService");

router.get("/", async (req,res)=>{

try{

await transporter.sendMail({

from: process.env.BREVO_EMAIL,

to: "saha.2k25@gmail.com",

subject: "Spense Test Mail",

html: `
<h2>Spense Mail Test</h2>
<p>Brevo SMTP is working successfully.</p>
`

});

res.send("Mail Sent Successfully");

}
catch(error){

console.log(error);

res.status(500).send(error.message);

}

});

module.exports = router;