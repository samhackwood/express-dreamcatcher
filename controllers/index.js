const Dream = require("../model/Dream");
const User = require("../model/User");
const moment = require('moment');

exports.index_get = (req, res) => {
    Dream.find()
    .then(dreams => {
        res.render("index", {dreams: dreams, moment})
    })
    .catch(err => {
        console.log(err);
    })
}
