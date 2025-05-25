const WishlistSchema = require('../Model/Wishlist');

exports.getWishlist = async (req, res, next) => {
    console.log(req.params);

    try {
        const { userId } = req.params;
        const wishlist = await WishlistSchema.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }
        res.status(200).json({ wishlist });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.addToWishlist = async (req, res, next) => {

    try {
        const { userId, productId, name, price, image } = req.body;

        if (!userId || !productId || !name || !price) {
            return res.status(401).json({ error: 'Please fill in all fields' });
        }

        let wishlist = await WishlistSchema.findOne({ userId });
        if (!wishlist) {
            wishlist = new WishlistSchema({ userId, products: [] });
        }

        const existingProduct = wishlist.products.find(product => product.productId === productId);
        if (existingProduct) {
            return res.status(403).json({ error: 'Product already in wishlist' });
        }

        wishlist.products.push({ productId, name, price, image });
        await wishlist.save();
        res.status(201).json({ message: 'Product added to wishlist', wishlist });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.removeFromWishlist = async (req, res, next) => {


    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ error: 'Please fill in all fields' });
        }

        const wishlist = await WishlistSchema.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }

        wishlist.products = wishlist.products.filter(product => product.productId !== productId);
        await wishlist.save();
        res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    } catch (err) {
        console.log(err);
        next(err);
    }
}