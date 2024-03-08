const jwt = require('jsonwebtoken');
const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {

    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password) {
        return res.json({ status: "error", error: "Please Enter your email and password" });
    }
    else {
        db.query('SELECT * from user where email = ?', [email], async (Err, result) => {
            if (Err) throw Err;
            console.log(password)
            console.log(result[0].password)
            // console.log(result)
            // console.log(result[0].password)
            // const p = password;
            //const passwordMatch = await bcrypt.compare(p, result[0].password);
            // console.log(passwordMatch)
            // Check if there's no user found with the provided email
            if (!result[0]) {
                return res.json({ status: "error", error: "User not found" });
            }

            // Check if the password provided does not match the hashed password stored in the database
            else if (!password) {
                return res.json({ status: "error", error: "Incorrect Password" });
            }

            else {
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status: "success", success: "User has been logged in" });
            }
        })
    }

}

module.exports = login;