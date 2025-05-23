const categories = require('../Model/catogories');

exports.getCategories = async (req, res, next) => {

    try {
        const Category = await categories.find();
        res.status(200).json({ Category });
    } catch (err) {
        console.log(err);
        next(err);
    }


}
exports.addCategory = async (req, res, next) => {
    try {
        if (!req.body) return res.status(400).json({ error: 'Please fill in all fields' });
        const { category, subcategory } = req.body;
        if (!category) return res.status(400).json({ error: 'Please fill categories' });
        if (category) {
            const existingCategory = await categories.findOne({
                category: { $regex: `^${category}$`, $options: 'i' } // Case-insensitive match
            });
            if (existingCategory) return res.status(400).json({ error: 'Category already exists' });
        }
        const newCategory = new categories({ category, subcategory });
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { subcategory } = req.body;
        if (!subcategory) return res.status(400).json({ error: 'Please fill in all fields' });
        const updatedCategory = await categories.findByIdAndUpdate(id, { $addToSet: { subcategory } }, { new: true });
        res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await categories.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}
