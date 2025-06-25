const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
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
    min: 6,
  },
  location: {
    type: String,
    default: "",
  },
  favorites: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Site"
    // type:[String]
     type: String, ref: 'Site'
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
