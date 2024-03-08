const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const register = async(req,res)=> {
    const {name, email, password} = req.body
    if(!email || !password){
        return res.json({status : "error", error : "Please Enter email and password"});
    }
    else{
        console.log(email);
        db.query('SELECT email FROM user WHERE email = ?', [email], async (err,result)=>{
          if(err) throw err;
          if(result[0]) return res.json({status : "error", error : "Email is already registered"})
          else{
            // const hpassword = await bcrypt.hash(password, 8);
            // console.log(hpassword);
            db.query('INSERT INTO user SET ?', {name : name, email : email, password : password}, (error,results)=>{
                if(error) throw error;
                console.log(results);
                return res.json({ status : "success", success: "User has been registered"})
            })
          }
        })
    }
}

module.exports = register;