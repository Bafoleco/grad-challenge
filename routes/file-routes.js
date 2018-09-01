//routing to (and creation of) dynamically served files

const router = require('express').Router();
const Badge = require('../models/badge-model');
const Assertion = require('../models/assertion-model');
const Profile = require('../models/profile-model');

router.get('/badge-defs/:badgeDefId', (req, res) => {
  var badgeDefId = req.params.badgeDefId;
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  Badge.findById(badgeDefId, (err, badgeClass) => {
    //$at$ is replaced with @ when rendered
    if(badgeClass) {
      var badgeClassJSON = {
        '@context': 'https://w3id.org/openbadges/v2',
        id: fullURL,
        type: 'BadgeClass',
        name: badgeClass.get('name'),
        // description: badgeClass.get('description'),
        // image: badgeClass.get('image'),
        criteria: badgeClass.get('criteria'),
        issuer: badgeClass.get('issuer')
        // tags: badgeClass.get('tags')
      }
      res.send(badgeClassJSON)
    }
    else {
      res.send('No badge class found for that ID');
    }
  });
});

router.get('/assertions/:assertionId', (req, res) => {
  var assertionId = req.params.assertionId;
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  var dateString = new Date().toISOString();
  Assertion.findById(assertionId, (err, assertion) => {
    if(assertion) {
      var assertionJSON = {
        '@context': 'https://w3id.org/openbadges/v2',
        id: fullURL,
        type: 'Assertion',
        recipient: {
          type: 'name',
          identity: assertion.get('recipient'),
        },
        issuedOn: dateString,
        verification: {
          type: 'hosted'
        },
        badge: assertion.get('badge')
      }
      res.send(assertionJSON);
    }
    else {
      res.send('No assertion found for that ID');
    }
  });
});

router.get('/profiles/:profileId', (req, res) => {
  var profileId = req.params.profileId;
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  Profile.findById(profileId, (err, profile) => {
    if(profile) {
      var profileJSON = {
        '@context': 'https://w3id.org/openbadges/v2',
        id: fullURL,
        type: 'issuer',
        name: profile.get('name'),
        url: profile.get('url'),
        description: profile.get('description')
      }
      res.send(profileJSON);
    }
    else {
      res.send('No profile found for that ID');
    }
  });
});

module.exports = router;
