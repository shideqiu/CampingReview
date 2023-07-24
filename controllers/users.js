const User = require("../models/user");
const Campground = require("../models/campground");
module.exports.renderRegister = (req, res) => {
    // res.send('here you go')
    res.render('users/register')
}

module.exports.userRegister = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!!');
            res.redirect(`/campgrounds`)
        })
        // console.log(registeredUser);

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    console.log(req.session.returnTo)
    res.render('users/login');
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectURL = res.locals.returnTo || '/campgrounds';
    delete res.locals.returnTo;
    res.redirect(redirectURL);
}

module.exports.logout = async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!')
        res.redirect('/campgrounds');
    });
}

module.exports.users = async (req, res) => {
    const user = req.user
    res.render('users/users', {user})
}

module.exports.renderChangePassword = async (req, res) => {
    const user = req.user
    res.render('users/changePassword', {user})
}

module.exports.changePassword = async (req, res) => {
    try {
        const {username, email, oldPassword, newPassword} = req.body;
        if (oldPassword === newPassword) {
            req.flash('error', "The new password must be different.");
            return res.redirect('/users')
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });
        await req.user.changePassword(oldPassword, newPassword);
        req.flash('success', 'Password changed successfully! Please log in with new password.')
        res.redirect('/login')
    } catch (e) {
        req.flash('error', "The username or password is incorrect.");
        res.redirect('/users')
    }
}