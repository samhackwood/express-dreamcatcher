const Dream = require("../model/Dream");
const Comment = require("../model/Comment");
const User = require("../model/User");
const moment = require('moment');

// HTTP GET - Load Article Add Form

// API Name = moduleName_functionality_HTTPMethod

// exports.dream_create_get = (req, res) => {
//     res.render("/");
// }

// HTTP POST - To save the data into the database
exports.dream_create_post = (req, res) => {

    // Save the data to the database

if (!req.user) {
    res.redirect('/notsignedin')
    }

    let dream = new Dream(req.body);
    dream.author = req.user.firstName + " " + req.user.lastName;
    dream.save()
    .then((new_dream)=> {
       User.findById(req.user._id)
       .then((user)=> {
           user.myDreams.push(new_dream);
           user.save();
           res.redirect("/dreams/mydreams");
       })
       .catch((err) => {
            console.log(err);
            res.send("Something went wrong!");
        })
    })


    .catch((err) => {
        console.log(err);
        res.send("Something went wrong!");
    })
}


// MY DREAMS
exports.dreams_show_get = (req, res) => {

    if (!req.user) {
        res.redirect('/notsignedin')
        } else {

    User.findById(req.user._id)
    .then((user)=> {
        Dream.find({ "_id": { $in: user.myDreams } })
        .then(dreams => {
            res.render("dreams/mydreams", {dreams: dreams, moment})
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch((err) => {
         console.log(err);
         res.send("Something went wrong!");
     })
    }
}

// ONE DREAM
exports.onedream_show_get = (req, res) => {
    
    Dream.findById(req.query.id)
    .then(dreams => {
        Comment.find({dream: req.query.id})
        .then(comments => {
            console.log("comments: ",comments)
            res.render("dreams/onedream", {dreams: dreams, comments: comments, moment})
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Load Article Edit Form
exports.dream_edit_get = (req, res) => {

    Dream.findById(req.query.id)
    .then((dreams) => {
        res.render("dreams/edit", {dreams: dreams})
    })
    .catch(err => {
        console.log(err)
    })
}

// HTTP PUT - Article Update
exports.dream_update_put = (req, res) =>{

    Dream.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/dreams/onedream?id="+req.body.id);
    })
    .catch(err => {
        console.log(err)
    })
}