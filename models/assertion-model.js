const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assertionSchema = new Schema({
  recipient: String,
  badge: String,
});

const Assertion = mongoose.model('assertion', assertionSchema);

module.exports = Assertion;
