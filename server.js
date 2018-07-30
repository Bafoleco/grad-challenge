const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys')
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')

//set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.key]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//connect to mongodb (maybe temp)
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to mongodb')
})

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//home route
app.get('/', (req, res) => {
  res.render('home');
});

//static hosting
app.use(express.static('public'));

//start
app.listen(5000, function() {
  console.log('listening on port 5000');
});
