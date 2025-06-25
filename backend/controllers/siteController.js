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
  const category = rawCategory.trim(); // remove extra spaces

  try {
    const sites = await Site.find({
      category: { $regex: new RegExp(`^${category}$`, "i") } // case-insensitive
    });

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
