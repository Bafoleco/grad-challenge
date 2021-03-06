const router = require('express').Router();
const Badge = require('../models/badge-model');
const Assertion = require('../models/assertion-model');
const Profile = require('../models/profile-model');
const Class = require('../models/class-model');

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
  //TODO add real handling for no profile
  Profile.findOne({owner: req.user._id}).then((profile) => {
    var profileIRI = req.protocol + '://' + req.get('host') +
      '/resources/profiles/' + profile.get('_id');
    new Badge({
      username: req.user.username,
      id: ' ',
      name: req.body.badgename,
      description: req.body.description,
      image: req.body.image,
      criteria: req.body.criteria,
      issuer: profileIRI,
      tags: ' '
    }).save();
  });
  res.redirect('/profile');
});

//issuebadge code
router.get('/issuebadge', authCheck, (req, res) => {
  res.render('issuebadge');
});

router.post('/issuebadge', authCheck, (req, res) => {
  Badge.findOne({name: req.body.badgename}, (err, badge) => {
    var badgeClassURI = req.protocol + '://' + req.get('host') +
      '/resources/badge-defs/' + badge.get('_id');
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
  Profile.findOne({owner: req.user._id}).then((profile) => {
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


//main
router.get('/main', authCheck, (req, res) => {
  console.log('Main');
  res.render('main');
});

//create a class
router.post('/createclass', authCheck, (req, res) => {
  new Class({
    className: req.body.classname,
    teacher: [req.user._id],
    student: []
  }).save();
  res.redirect('/profile');
})

//add a student to a class

router.post('/addstudent', authCheck, (req, res) => {
  const classID = req.body.classID;
  const personID = req.body.personID;
  Class.findById(classID).then((classToEnroll) => {
    console.log(classToEnroll);
    classToEnroll.student.push(personID);
    classToEnroll.save((err) => {
      if (err) return handleError(err);
    });
  })
});

module.exports = router;
