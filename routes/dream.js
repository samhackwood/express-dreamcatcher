const express = require('express')
var methodOverride = require('method-override')
const router = require('express').Router();

const dreamCtrl = require("../controllers/dream");

router.use(methodOverride('_method'));

router.use(express.urlencoded({extended: true}));

router.post("/dream", dreamCtrl.dream_create_post);
router.get("/dreams/mydreams", dreamCtrl.dreams_show_get);
router.get("/dreams/onedream", dreamCtrl.onedream_show_get);
router.get("/dreams/edit", dreamCtrl.dream_edit_get);
router.put("/dreams/update", dreamCtrl.dream_update_put);


module.exports = router;