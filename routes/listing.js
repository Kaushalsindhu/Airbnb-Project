const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))                                                   //INDEX ROUTE
.post(upload.single('listing[image]'),/*validateListing,*/ wrapAsync(listingController.createListing));        //CREATE ROUTE

router.get("/new", isLoggedIn, listingController.renderNewForm);                           //NEW ROUTE

router.route("/:id")
.get(wrapAsync(listingController.showListing))                                             //SHOW ROUTE
.put(isLoggedIn, isOwner, upload.single('listing[image]'),  wrapAsync(listingController.updateListing)) //UPDATE ROUTE
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));                  //DELETE ROUTE

router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListing));             //EDIT ROUTE

module.exports = router;