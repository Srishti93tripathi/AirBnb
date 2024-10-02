const express= require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/users.js")

//Signup Route

router.get("/signup", userController.renderSignupForm);

//Signup post Route

router.post("/signup", wrapAsync(userController.signupUser));

//Login Form Route

router.get("/login", userController.renderLoginForm);

//Login Post Route

router.post("/login",saveRedirectUrl,
passport.authenticate("local", {failureRedirect: "/login" , failureFlash: true}),
wrapAsync(userController.loginUser)); 

//Logout Route

router.get("/logout", userController.logoutUser);

module.exports = router;