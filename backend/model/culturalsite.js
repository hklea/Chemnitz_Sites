const mongoose = require('mongoose');
const { Schema } = mongoose;


const SiteItemSchema = new Schema({
  type: { type: String },
  id: { type: String },
  properties: { type: Schema.Types.Mixed },
  geometry: {
    type: {
      type: String
    },
    coordinates: [Number]
  }

}, { _id: false }); 

const SiteSchema = new Schema({
  type: { type: String },
  features: [SiteItemSchema]
});


const Site = mongoose.model('Site',SiteSchema);
module.exports = Site;
