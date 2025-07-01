const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a single Feature item
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

// Export the model
const Site = mongoose.model('Site',SiteSchema);
module.exports = Site;
