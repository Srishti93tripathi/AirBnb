const express= require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utlis/wrapAsync.js");
const {isLoggedIn, isOwner, validateSchema} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({ storage });


const listingController = require("../controller/listings.js");


//INDEX ROUTE  //CREATE ROUTE

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, validateSchema, upload.single("listing[image]"), wrapAsync(listingController.creatListing));



//NEW ROUTE

router.get("/new", isLoggedIn, listingController.renderNewForm);


//SHOW ROUTE  //DELETE ROUTE  //UPDATE ROUTE
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))
.put(isLoggedIn, isOwner, validateSchema, upload.single("listing[image]"), wrapAsync(listingController.updateListing));


//EDIT ROUTE

router.get("/:id/edit", isLoggedIn, isOwner, validateSchema, wrapAsync(listingController.renderEditForm)); 








module.exports = router;