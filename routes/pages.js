const express = require('express');
const logout = require('../controllers/logout');
const router = express.Router();
const loggedIn = require('../controllers/loggeIn')


router.get("/", loggedIn, (req,res)=>{
    if(req.user){
        res.render("index", {status: "LoggedIn", user: req.user} );
    }else{
        res.render("index", {status: "No", user: "nothing"} );
    }
})

router.get("/register",(req,res)=>{
    res.sendFile("register.html", { root: "./public/js"});
})

router.get("/login",(req,res)=>{
    res.sendFile("login.html", { root: "./public/js"});
})

router.get("/logout", logout);
module.exports = router;