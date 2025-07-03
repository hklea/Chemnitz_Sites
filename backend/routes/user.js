
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../model/User");
const Site = require("../model/culturalsite");
const authMiddleware = require("../middleware/authMiddleware"); 

// Add site to favorites
router.post("/:userId/favorites", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { siteId } = req.body;

  try {
  
    if (req.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

   
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const bigSiteDoc = await Site.findOne();
    if (!bigSiteDoc) return res.status(404).json({ message: "Site data not found" });

    // Find the feature inside features array by matching the siteId
    const feature = bigSiteDoc.features.find(
      f => f.id === siteId || (f.properties && f.properties["@id"] === siteId)
    );

    if (!feature) return res.status(404).json({ message: "Site not found" });

    // Add siteId to favorites if not already there
    if (!user.favorites.includes(siteId)) {
      user.favorites.push(siteId);
      await user.save();
    }

    res.status(200).json({ message: "Added to favorites", favorites: user.favorites });
  } catch (err) {
    console.error("Add favorite error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Remove site from favorites
router.delete("/:userId/favorites/:siteId", authMiddleware, async (req, res) => {
  const { userId, siteId } = req.params;

  try {
    if (req.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter(fav => fav.toString() !== siteId);
    await user.save();

    res.status(200).json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (err) {
    console.error("Remove favorite error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Get all favorite sites (populated)
router.get("/:userId/favorites", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    if (req.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const bigSiteDoc = await Site.findOne();
    if (!bigSiteDoc) return res.status(404).json({ message: "Site data not found" });

    // Filter the features that are in user's favorites
    const favoriteFeatures = bigSiteDoc.features.filter(f =>
      user.favorites.includes(f.id) || (f.properties && user.favorites.includes(f.properties["@id"]))
    );

    res.status(200).json({ favorites: favoriteFeatures });
  } catch (err) {
    console.error("Fetch favorites error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
