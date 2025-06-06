const productModel = require('../Model/Product');
const categoryModel = require('../Model/catogories');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        // Parse form fields
        const { name, description, price, category, subcategory, stockQuantity, rating, variants, existingImages } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !subcategory) {
            return res.status(400).json({ error: 'Please fill in all fields' });
        }
        console.log(req.body);

        // Handle uploaded images
        let images = [];
        if (existingImages) {
            if (Array.isArray(existingImages)) {
                images = existingImages;
            } else if (typeof existingImages === 'string') {
                // If it's a single URL string, wrap in array
                if (existingImages.startsWith('http')) {
                    images = [existingImages];
                } else {
                    // Try to parse as JSON array or comma-separated
                    try {
                        images = JSON.parse(existingImages);
                    } catch {
                        images = existingImages.split(',').map(img => img.trim());
                    }
                }
            }
        }
        if (req.files && req.files.length > 0) {
            // Normalize to full URL
            const baseUrl = req.protocol + '://' + req.get('host');
            images = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);
        }



        const existingCategory = await categoryModel.findOne({ category: { $regex: `^${category}$`, $options: 'i' } });
        if (!existingCategory) {
            return res.status(400).json({ error: 'Category does not exist' });
        }
        if (existingCategory.subcategory.length > 0) {
            const existingSubcategory = existingCategory.subcategory.find(sub => sub.toLowerCase() === subcategory.toLowerCase());
            if (!existingSubcategory) {
                return res.status(400).json({ error: 'Subcategory does not exist' });
            }
        }


        const newProduct = new productModel({
            name,
            description,
            price,
            category: existingCategory.category,
            subcategory,
            images,
            stockQuantity,
            rating,
            variants
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', newProduct });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, subcategory, existingImages, stockQuantity, rating, variants } = req.body;
        console.log(req.body);
        if (!name || !description || !price || !category || !subcategory) {
            return res.status(400).json({ error: 'Please fill in all fields' });
        }
        const existingCategory = await categoryModel.findOne({ category: { $regex: `^${category}$`, $options: 'i' } });
        if (!existingCategory) {
            return res.status(400).json({ error: 'Category does not exist' });
        }
        //
        let images = [];
        if (existingImages) {
            if (Array.isArray(existingImages)) {
                images = existingImages;
            } else if (typeof existingImages === 'string') {
                // If it's a single URL string, wrap in array
                if (existingImages.startsWith('http')) {
                    images = [existingImages];
                } else {
                    // Try to parse as JSON array or comma-separated
                    try {
                        images = JSON.parse(existingImages);
                    } catch {
                        images = existingImages.split(',').map(img => img.trim());
                    }
                }
            }
        }

        // Add new uploaded images
        if (req.files && req.files.length > 0) {
            const baseUrl = req.protocol + '://' + req.get('host');
            const newImages = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);
            images = images.concat(newImages);
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { name, description, price, category, subcategory, images, stockQuantity, rating, variants },
            { new: true }
        );
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

