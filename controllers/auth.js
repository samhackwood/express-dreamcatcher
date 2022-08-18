
const User = require("../model/User");

const bcrypt = require('bcrypt');
const salt = 10;

const passport = require('../helper/ppConfig');


exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

exports.auth_signup_post = (req, res) => { 

    let user = new User(req.body);

    let hashedPassword = bcrypt.hashSync(req.body.password, salt);

    user.password = hashedPassword;

    user
    .save()
    .then(() => {
        res.redirect("/auth/signin");
    })
    .catch((err) => {
        console.log(err);
        res.send("Try again later!");
    })
}


exports.auth_signin_get = (req, res) => {
    res.render("auth/signin");
}


exports.auth_signin_post = 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/signin",  
        failureFlash: "Invalid username or password",
        successFlash: "You are logged in successfully",
    })


exports.auth_logout_get = (req, res) => {
    req.logout(function(err) {
    if (err) { return next(err); }
    req.flash("success", "You are successfully logged out!!")
    res.redirect("/auth/signin");
  });
};

exports.profilepwd_update_put = (req, res) =>{
    if(req.body.pwd1 == req.body.pwd2){
        User.findByIdAndUpdate(req.user._id,{password: bcrypt.hashSync(req.body.pwd1, salt)})
        .then(() => {
            res.redirect("/profile/myprofile");
        })
        .catch(err => {
            console.log(err)
        })
    }
    else {
        req.flash("error", "Passwords doesn't match!")
        res.redirect("back");
    }

}