const router = require('express').Router();
const Badge = require('../models/badge-model');
const Assertion = require('../models/assertion-model');

router.get('/badge-defs/:badgeDefId', (req, res) => {
  var badgeDefId = req.params.badgeDefId;
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  Badge.findById(badgeDefId, (err, badgeClass) => {
    var badgeClassJSON = {
      id: fullURL,
      type: 'BadgeClass',
      name: badgeClass.get('name'),
      description: badgeClass.get('description'),
      image: badgeClass.get('image'),
      criteria: badgeClass.get('criteria'),
      issuer: badgeClass.get('issuer'),
      tags: badgeClass.get('tags')
    }
    res.send(badgeClassJSON)
  });
});

router.get('/assertions/:assertionId', (req, res) => {
  var assertionId = req.params.assertionId;
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  Assertion.findById(assertionId, (err, assertion) => {
    var assertionJSON = {
      id: fullURL,
      type: 'assertion',
      recipient: assertion.get('recipient'),
      badge: assertion.get('badge'),
    }
    res.send(assertionJSON);
  });
});

module.exports = router;
