const User = require("../model/User");



exports.profile_show_get = (req, res) => {

    if (!req.user) {
        res.redirect('/notsignedin')
        } else {
    res.render('profile/myprofile');
        }
}

exports.profile_edit_get = (req, res) => {
    User.findById(req.user._id)
    .then((user) => {
        res.render("profile/edit", {user: user})
    })
    .catch(err => {
        console.log(err)
    })
}

exports.profile_update_put = (req, res) =>{

    User.findByIdAndUpdate(req.user._id, req.body)
    .then(() => {
        res.redirect("/profile/myprofile");
    })
    .catch(err => {
        console.log(err)
    })
}
exports.profilepwd_edit_get = (req, res) => {
    res.render('profile/pwd');
}

