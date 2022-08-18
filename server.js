
const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

require('dotenv').config();

const expressLayouts = require('express-ejs-layouts');

const flash = require('connect-flash');

const app = express();

// Look for all static files (CSS, JS, images, Videos, Audio) in public folder.
app.use(express.static("public"));

app.use(bodyParser.json())

app.use(express.urlencoded({extended: true}));

app.use(expressLayouts);

const PORT = process.env.PORT;

let session = require('express-session');
let passport = require('./helper/ppConfig');

app.use(session({
secret: process.env.SECRET,
saveUninitialized: true,
resave: false,
cookie: {maxAge: 3600000}
}))

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

app.use(function(req, res, next){
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
})

const indexRouter = require("./routes/index");

const authRouter = require("./routes/auth");

const profileRouter = require("./routes/profile");

const dreamRouter = require("./routes/dream")

const commentRouter = require("./routes/comment")




app.use('/', indexRouter);

app.use('/', profileRouter);

app.use('/', authRouter);

app.use('/', dreamRouter);

app.use('/', commentRouter);

app.get('/notsignedin', (req, res) => {
    res.render('notsignedin')
})

app.get('/workinprogress', (req, res) => {
    res.render('workinprogress')
})

// Listen to Port with callback function.
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// NodeJS to look in a folder called views for all EJS files
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect(process.env.mongoDBURL, 
        {useNewUrlParser: true,
        useUnifiedTopology: true},
        () => {
            console.log("mongodb connected!!!");
        });

