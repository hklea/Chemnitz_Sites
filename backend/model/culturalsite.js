const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  _id:String,
  name: String,
  category: String,
  description: String,
  location: {
    lat: Number,
    lng: Number
  },
  address: String,
  phone: String,
  email: String,
  website: String,
  image: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  }, { collection: 'Chemnitz'
});

module.exports = mongoose.model("Site", siteSchema);
