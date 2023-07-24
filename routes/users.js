const User = require('../models/user');
const express = require("express");
const Campground = require("../models/campground");
const users = require("../controllers/users")
const router = express.Router();
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(users.userRegister)
// router.get('/register', users.renderRegister)
// router.post('/register', users.userRegister)

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

// router.get('/login', users.renderLogin)
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;