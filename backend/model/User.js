const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,  
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,   
  },
  location: {
    type: String,
    default: "",
  },
 favorites: {
  type: [String],
  default: []
}
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
