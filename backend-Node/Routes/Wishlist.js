
const express = require("express");
const router = express.Router();
const wishlistController = require("../Controller/WishlistController");


router.get("/all/:userId", wishlistController.getWishlist); // Get all items in the wishlist
router.post("/add", wishlistController.addToWishlist); // Add an item to the wishlist
router.delete("/remove", wishlistController.removeFromWishlist); // Remove an item from the wishlist

module.exports = router;