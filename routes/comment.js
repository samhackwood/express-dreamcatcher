const express = require('express')

const router = require('express').Router();

const dreamCtrl = require("../controllers/comment");

// router.get("/auth/signup", authCtrl.auth_signup_get);

router.post("/comment", dreamCtrl.comment_create_post);

module.exports = router;