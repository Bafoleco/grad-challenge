const router = require('express').Router();
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
  res.redirect('/profile');
});

module.exports = router;
