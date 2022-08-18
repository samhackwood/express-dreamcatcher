const express = require('express');

var methodOverride = require('method-override')

const router = express.Router();

const profileCtrl = require("../controllers/myprofile");
const authCtrl = require("../controllers/auth");


router.use(methodOverride('_method'));

router.use(express.urlencoded({extended: true}));

router.get("/profile/myprofile", profileCtrl.profile_show_get);
router.get("/profile/edit", profileCtrl.profile_edit_get);
router.put("/profile/update", profileCtrl.profile_update_put);
router.get("/profile/pwd", profileCtrl.profilepwd_edit_get);
router.put("/profile/pwd/update", authCtrl.profilepwd_update_put);

module.exports = router;

