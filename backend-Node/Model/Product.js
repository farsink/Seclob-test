const mangoose = require('mongoose');
const Schema = mangoose.Schema;


// define the Product model schema
const VariantSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false },
    stockQuantity: { type: Number, required: false, default: 0 }
}, { _id: false });

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    images: { type: Array, required: false, default: [] },
    stockQuantity: { type: Number, required: false, default: 0 },
    rating: { type: Number, required: false, default: 3 },
    variants: { type: [VariantSchema], required: false, default: [] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mangoose.model('Product', ProductSchema);