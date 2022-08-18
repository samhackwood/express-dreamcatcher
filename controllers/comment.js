const Comment = require("../model/Comment");
const moment = require('moment');

exports.comment_create_get = (req, res) => {
    res.render("/");
}

// HTTP POST - To save the data into the database
exports.comment_create_post = (req, res) => {

    if (!req.user) {
        res.redirect('/notsignedin')
        } else {

    let commentData = {
        content: req.body.content,
        dream: req.body.dreamId,
        user: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    }
    let comment = new Comment(commentData);

    comment.save()
    .then(()=> {
        res.redirect('back');
    })

    .catch((err) => {
        console.log(err);
        res.send("Something went wrong!");
    })
    }
}