var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
  id: String,
  teamid:String,
  Name: String
});

module.exports = mongoose.model('Member', MemberSchema);