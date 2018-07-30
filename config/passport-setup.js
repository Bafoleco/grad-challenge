const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    //options for google strat
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (acessToken, refreshToken, profile, done) => {
    //check if user already exist in the database
    User.findOne({googleID: profile.id}).then((currentUser) => {
      if(currentUser) {
          //already have a user
          console.log('User is ' + currentUser);
          done(null, currentUser);
      } else {
        //if not, create new user
        new User({
          username: profile.displayName,
          googleID: profile.id
        }).save().then((newUser) => {
          console.log('new user created' + newUser);
          done(null, newUser);
        });
      }
    })
  })
);
