var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  id: String,
  Name: String,
  domain: String,
  task: String,
  description: String,
  deadline: String,
  //updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);