var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  id: String,
  Name: String,
  members: Number,
  project:String,
  task:String,
  description: String,
  //updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Team', TeamSchema);