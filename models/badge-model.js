const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeSchema = new Schema({
  username: String,
  id: String,
  name: String,
  description: String,
  image: String,
  criteria: String,
  issuer: String,
  tags: Array
});

const Badge = mongoose.model('badge', badgeSchema);

module.exports = Badge;
