const db = require("../config/db");
const bcrypt = require("bcrypt");

const resetPassword = async (req,res)=>{

    const { email, password } = req.body;

    try{

        const hashedPassword =
        await bcrypt.hash(password,10);

        const sql =
        "UPDATE users SET password=? WHERE email=?";

        db.query(
            sql,
            [hashedPassword,email],
            (err)=>{

                if(err){
                    return res.status(500).json(err);
                }

                res.json({
                    message:"Password Updated Successfully"
                });

            }
        );

    }
    catch(error){

        res.status(500).json(error);

    }

};

module.exports = {
    resetPassword
};