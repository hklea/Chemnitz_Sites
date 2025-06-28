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
  const rawCategory = req.params.category;
  const category = rawCategory.trim();
 
  const fieldsToSearch = [
    "features.properties.amenity",
    "features.properties.tourism",
    "features.properties.leisure",
    "features.properties.museum",
    "features.properties.cuisine",
    "features.properties.office",
    "features.properties.shop"
  ];

  try {
    const orQueries = fieldsToSearch.map((field) => ({
      [field]: { $regex: new RegExp(`^${category}$`, "i") },
    }));

    const sites = await Site.find({ $or: orQueries });

    if (sites.length === 0) {
      console.log("No sites found for category:", category);
    }

    res.json(sites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllSites,
  getSitesByCategory,
};
