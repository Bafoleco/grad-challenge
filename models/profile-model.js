const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: String,
  url: String,
  description: String,
  //_id of the owner user
  owner: String
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
