const Site = require("../model/culturalsite");

const getAllSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getSitesByCategory = async (req, res) => {
  const categoryField = req.params.field;
  const categoryValue = req.params.value;

  try {
    const result = await Site.aggregate([
      { $unwind: '$features' },
      {
        $match: {
          [`features.properties.${categoryField}`]: categoryValue
        }
      },
      {
        $project: {
          _id: 0,
          id: "$features.id",
          geometry: "$features.geometry",
          properties: "$features.properties",
          type: "$features.type"
        }
      }
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving features by category',
      error: err.message
    });
  }
};

const getFeatureById = async (req, res) => {
  const featureId = req.params.id;

  try {
    const result = await Site.aggregate([
      { $unwind: '$features' },
      {
        $match: {
          'features.id': featureId
        }
      },
      {
        $project: {
          _id: 0,
          id: "$features.id",
          geometry: "$features.geometry",
          properties: "$features.properties",
          type: "$features.type"
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: `Feature with id '${featureId}' not found` });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving feature by ID',
      error: error.message
    });
  }
};


const Fuse = require('fuse.js');

const searchSiteByName = async (req, res) => {
  const searchTerm = req.params.name;

  try {
    const doc = await Site.findOne({});
    const features = doc ? doc.features : [];

    const fuse = new Fuse(features, {
      keys: ['properties.name'],
      threshold: 0.4,
      minMatchCharLength: 1,
    });

    const result = fuse.search(searchTerm).map(item => ({
      id: item.item.id,
      name: item.item.properties.name,
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: 'Error searching features by name (fuzzy)',
      error: err.message,
    });
  }
};



module.exports = {
  getAllSites,
  getSitesByCategory,
  getFeatureById,
  searchSiteByName
};

