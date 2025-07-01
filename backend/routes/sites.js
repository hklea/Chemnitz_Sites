const express = require("express");
const router = express.Router();
const { getAllSites, getSitesByCategory, getFeatureById, searchSiteByName} = require("../controllers/siteController");

router.get("/getAll", getAllSites);
router.get("/sites/category/:field/:value", getSitesByCategory);
router.get("/sites/:id",getFeatureById);
router.get("/sitesSearch/:name",searchSiteByName);

module.exports = router;