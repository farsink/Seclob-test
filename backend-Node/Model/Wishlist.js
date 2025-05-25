const mangoose = require('mongoose');
const Schema = mangoose.Schema;

// define the Wishlist model schema
const WishlistSchema = new Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: false }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mangoose.model('Wishlist', WishlistSchema);