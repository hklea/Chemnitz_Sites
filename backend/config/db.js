const mongoose = require('mongoose');
const Site  = require('../model/culturalsite'); // Check this path!
const fs = require('fs/promises');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (!MONGO_URI) {
      console.error('Please provide the Mongo URI');
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    if (mongoose.connection.db) {
      // Make sure collection name matches what mongoose/model uses
      const collections = await mongoose.connection.db.listCollections({ name: 'sites' }).toArray();
      if (collections.length === 0) {
        await Site.createCollection();
        console.log('Site collection created successfully');
        await seedSites();
      } else {
        console.log('Site collection already exists');
      }
    }

  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

async function seedSites() {
  try {
    const count = await Site.countDocuments();
    if (count > 0) {
      console.log('Sites already seeded.');
      return;
    }

    const filePath = path.join(process.cwd(), 'Chemnitz.geojson');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const geojson = JSON.parse(fileData);

    await Site.create({
      type: geojson.type,
      features: geojson.features,
    });

    console.log('GeoJSON features seeded into database.');
  } catch (error) {
    console.error('Error seeding features:', error);
  }
}

module.exports = connectDB;
