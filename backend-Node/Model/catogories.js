const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Category model schema
const CategorySchema = new Schema({
    category: { type: String, required: true },
    subcategory: { type: Array, required: false, default: [] },
});

module.exports = mongoose.model('category', CategorySchema);