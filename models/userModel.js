const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
  firstName: { 
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("User", userModel);