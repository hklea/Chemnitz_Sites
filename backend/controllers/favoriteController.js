
const User = require("../model/User");
const Site = require("../model/culturalsite");


const addFavoriteSite = async (req, res) => {
  const userId = req.userId;
  const { featureId } = req.body;

  if (!featureId) {
    return res.status(400).json({ message: "featureId is required." });
  }

  try {
    const featureExists = await Site.aggregate([
      { $unwind: "$features" },
      { $match: { "features.id": featureId } },
      { $limit: 1 }
    ]);

    if (featureExists.length === 0) {
      return res.status(404).json({ message: "Feature with given ID not found." });
    }

    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    
    if (!Array.isArray(user.favorites)) {
      user.favorites = [];
    }

    
    if (user.favorites.includes(featureId)) {
      return res.status(400).json({ message: "Feature already in favorites." });
    }

  
    user.favorites.push(featureId);
    await user.save();

    res.status(200).json({ message: "Feature added to favorites successfully.", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeFavoriteSite = async (req, res) => {
  const userId = req.userId; 
  const { featureId } = req.body;

  if (!featureId) {
    return res.status(400).json({ message: "featureId is required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

   
    if (!Array.isArray(user.favorites)) {
      user.favorites = [];
    }

    const index = user.favorites.indexOf(featureId);
    if (index === -1) {
      return res.status(400).json({ message: "Feature not in favorites." });
    }

    user.favorites.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Feature removed from favorites.", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFavoriteSites = async (req, res) => {
  const userId = req.userId; // from middleware

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (!Array.isArray(user.favorites) || user.favorites.length === 0) {
      return res.status(200).json([]);
    }

   
    const favoriteFeatures = await Site.aggregate([
      { $unwind: "$features" },
      { $match: { "features.id": { $in: user.favorites } } },
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

    res.status(200).json(favoriteFeatures);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {
  addFavoriteSite,
  removeFavoriteSite,
  getFavoriteSites
};
