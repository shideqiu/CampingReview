const express = require('express');
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds")
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware")
const multer  = require('multer')
const { storage } = require("../cloudinary/index")
const upload = multer({ storage })


router.route('/')
    .get(campgrounds.index)
    .post(isLoggedIn, upload.array('image'), validateCampground, campgrounds.createCampground)

// Create a new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id/edit')
    .get(isLoggedIn, isAuthor, campgrounds.renderEditForm)
    .post(isLoggedIn, isAuthor, upload.array('image'), validateCampground, campgrounds.updateCampground)
// List all campgrounds
// router.get('/', campgrounds.index)

// Create a new campground
// router.get('/new', isLoggedIn, campgrounds.renderNewForm)
// router.post('/', isLoggedIn, validateCampground, campgrounds.createCampground)

// Edit a campground
// router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.renderEditForm)
// router.post('/:id/edit', isLoggedIn, isAuthor, validateCampground, campgrounds.updateCampground)

// Delete a campground
router.post('/:id/delete', isLoggedIn, isAuthor, campgrounds.deleteCampground)

// Show details of selected campground
router.get('/:id', campgrounds.showCampground)

module.exports = router;