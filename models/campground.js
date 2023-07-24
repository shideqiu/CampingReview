const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const User = require('./user');

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = {toJSON: {virtuals: true}};

const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this.id}">${this.title}</a></strong>
            <p>${this.description.substring(0, 35)}...</p>`
})
// Remove all reviews when delete a campground
campgroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground) {
        await Review.deleteMany({_id: {$in: campground.reviews}})
    }
})

const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;