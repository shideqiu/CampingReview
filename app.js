if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const morgan = require('morgan');
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError');
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const dbUrl = process.env.DB_URL;

// Connect to the nosql database
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://localhost:27017/yelpCamp');
mongoose.connect(dbUrl)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)

app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


const sessionConfig = {
    name: 'session',
    secret: 'thisisnotagoodsecret',
    // secure: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.returnTo = req.session.returnTo;
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/', userRoutes)

// Home page
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', (req, res) => {
    throw new ExpressError('Page Not Found', 404)
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something Went Wrong'} = err;
    console.log(message)
    res.status(status).render('error', {err})
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})
