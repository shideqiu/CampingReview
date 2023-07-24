const Campground = require("./models/campground");
const {campgroundSchema, reviewSchema} = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review")

module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in.');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user.id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user.id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


module.exports.validateCampground = (req, res, next) => {
    const result = campgroundSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.details.map(el => el.message).join(','), 400)
    } else {
        next()
    }
}


module.exports.validateReview = (req, res, next) => {
    console.log(req.body)
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.details.map(el => el.message).join(','), 400)
    } else {
        next()
    }
}