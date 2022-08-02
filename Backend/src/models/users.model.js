const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    trim: true
  },
  phone:{
    type:String,
    required:true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim: true
    
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role:{
    type:String,
    required:true,
    trim:true
  }

},{
  timestamps:true
});
module.exports = mongoose.model("usersInformation",userSchema)
