const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name : {type: String, required: true, minLength: 2,  maxLength:20 },
  email : {type: String, required: true, unique: true,  minLength: 2,  maxLength:200},
  password : {type: String, required: true,  minLength: 2,  maxLength:2056},
}, {
  timeStamps:true
})


const userModel = mongoose.model("User", userSchema)


module.exports = userModel;