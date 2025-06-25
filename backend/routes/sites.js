const express = require("express");
const router = express.Router();
const { getAllSites, getSitesByCategory} = require("../controllers/siteController");

router.get("/getAll", getAllSites);
router.get("/sites/category/:category", getSitesByCategory);

module.exports = router;