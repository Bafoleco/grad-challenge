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


//takes a array of user object ids and returns an array of user objects
async function returnMemberArray(memberIds) {
  const promises = memberIds.map((memberId) => {
    return User.findById(memberId).then((member) => {
        return member;
    });
  });
  const memberArray = await Promise.all(promises).then((memberArray) => {
    return memberArray}
  );
  return memberArray;
}

//takes an express.js req and res and an array of member ids,
//then sends an array of the associated member objects in response
async function sendMemberData(req, res, memberIds) {
  const memberArray = await returnMemberArray(memberIds);
  const response = {
    members: memberArray
  }
  res.send(response);
}

//takes in a class object and returns a promise which resolves to a array of unique members
async function getUniqueMemberIds(classObject) {
  const uniqueMemberIdArrayReturnPromise = new Promise((resolve, reject) => {
    const memberIdArray = classObject.student.concat(classObject.teacher);
    const uniqueMemberIdArray = memberIdArray.filter(function(item, pos) {
      return memberIdArray.indexOf(item) == pos;
    });
    if(uniqueMemberIdArray) {
      resolve(uniqueMemberIdArray)
    }
    else {
      reject(Error('bad thing'))
    }
  });
  return uniqueMemberIdArrayReturnPromise;
}


//api which returns the students enrolled in the selected claass
router.get('/getmembers/:classId', (req, res) => {
  const classId = req.params.classId;
  console.log('Hello');
  Class.findById(classId).exec((err, returnedClass) => {
    if(err) {
      console.log('Class not found for that Id');
      res.send('ERROR: Class not found for that id');
    }
    else {
      getUniqueMemberIds(returnedClass).then((uniqueMemberIdArray) => {
        sendMemberData(req, res, uniqueMemberIdArray);
      });
    }
  });
});
module.exports = router;
