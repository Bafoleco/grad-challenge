const router = require('express').Router();
const Badge = require('../models/badge-model');
const Assertion = require('../models/assertion-model');
const Profile = require('../models/profile-model');
const User = require('../models/user-model');
const Class = require('../models/class-model');

function sendUserData(req, res, classArray) {
  console.log('sent data');
  const response = {
    username: req.user.username,
    id: req.user._id,
    classes: classArray
  }
  console.log(classArray);
  console.log(response);
  res.send(response);
}


//return a json document with the required information for the react comnpinent
router.get('/userinfo', (req, res) => {
  var classArray = [];

  var ctr = 0;
  Class.find({teacher: req.user.id}).exec((err, classes) => {
    if(classes.length == 0) {
      sendUserData(req, res, classArray);
    }
    classes.forEach((ownedClass, index, array) => {
      classArray.push(ownedClass);
      ctr++;
      if(ctr == array.length) {
        sendUserData(req, res, classArray);
      }
    });
  });
});

//api which exposes a list of all Users to the frontend
function sendPeopleData(req, res, peopleArray) {
  console.log('sent data');
  const response = {
    people: peopleArray
  }
  console.log(peopleArray);
  res.send(response);
}

router.get('/peopleinfo', (req, res) => {
  var peopleArray = [];

  var ctr = 0;
  User.find({}).exec((err, people) => {
    if(people.length == 0) {
      sendPeopleData(req, res, peopleArray);
    }
    people.forEach((person, index, array) => {
      peopleArray.push(person);
      ctr++;
      if(ctr == array.length) {
        sendPeopleData(req, res, peopleArray);
      }
    });
  });
});

module.exports = router;
