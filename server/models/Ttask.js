var mongoose = require('mongoose');

var TtaskSchema = new mongoose.Schema({
  teamid:String,
  id: String,
  Name: String,
  domain: String,
  task: String,
  description: String,
  deadline: String,
  isComplete:Boolean,
  //updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ttask', TtaskSchema);