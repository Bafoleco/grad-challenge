const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleID: String,
});

const User = mongoose.model('goose', userSchema);

module.exports = User; 
