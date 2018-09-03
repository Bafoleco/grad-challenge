const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  className: String,
  teacher: [String],
  student: [String]
});

const Class = mongoose.model('class', classSchema);

module.exports = Class;
