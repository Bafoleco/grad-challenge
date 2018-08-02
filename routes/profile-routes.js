const router = require('express').Router();
const Badge = require('../models/badge-model');
const Assertion = require('../models/assertion-model');
const Profile = require('../models/profile-model');

//TODO input validation, unsanitized input especially when combined with incorporating variables in ejs
const authCheck = (req, res, next) => {
  if(!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.render('profile');
});

//createbadge code
router.get('/createbadge', authCheck, (req, res) => {
  res.render('createbadge');
});

router.post('/createbadge', (req, res) => {
  console.log(req.body.badgename);
  new Badge({
    username: req.user.username,
    id: ' ',
    name: req.body.badgename,
    description: ' ',
    image: ' ',
    criteria: ' ',
    issuer: ' ',
    tags: ' '
  }).save();
  res.redirect('/profile');
});

//issuebadge code
router.get('/issuebadge', authCheck, (req, res) => {
  res.render('issuebadge');
});

router.post('/issuebadge', authCheck, (req, res) => {
  Badge.findOne({name: req.body.badgename}, (err, badge) => {
    var badgeClassURI = req.protocol + '://' + req.get('host') +
      '/resources/assertions/' + badge.get('_id');
    new Assertion({
      recipient: req.body.recipientname,
      badge: badgeClassURI
    }).save();
  });
  res.redirect('/profile');
});

//profile code
router.get('/createprofile', authCheck, (req, res) => {
  res.render('createprofile');
});

router.post('/createprofile', authCheck, (req, res) => {
  Profile.findOne({_id: req.user._id}).then((profile) => {
    if(!profile) {
      new Profile({
        name: req.user.username,
        url: req.body.url,
        description: req.body.description,
        owner: req.user._id
      }).save();
    }
  })
  res.redirect('/profile');
});



module.exports = router;
