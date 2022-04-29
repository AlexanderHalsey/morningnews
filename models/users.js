var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    token: String,
});
  
const UserModel = mongoose.model("users", userSchema);
  
module.exports = UserModel;