const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const {
  addFavoriteSite,
  removeFavoriteSite,
  getFavoriteSites
} = require("../controllers/favoriteController");

router.post("/addFavorite",middleware, addFavoriteSite);
router.post("/removeFavorite",middleware, removeFavoriteSite);
router.get("/getFavorite",middleware, getFavoriteSites);

module.exports = router;
