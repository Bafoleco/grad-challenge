const router = require('express').Router();
const Badge = require('../models/badge-model')

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

module.exports = router;
