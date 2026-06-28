const Product = require('../models/Product');
const Category = require('../models/Category');

// Obtener todos los productos (con categoría)
exports.getProducts = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const where = {};
        
        if (categoryId) {
            where.categoryId = categoryId;
        }

        const products = await Product.findAll({
            where,
            include: [{ model: Category, as: 'categoria' }]
        });
        res.json(products);
    } catch (error) {
        console.error('Error en getProducts:', error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [{ model: Category, as: 'categoria' }]
        });
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.json(product);
    } catch (error) {
        console.error('Error en getProductById:', error);
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, categoryId, imageUrl } = req.body;
        
        const newProduct = await Product.create({
            nombre,
            precio,
            descripcion,
            categoryId,
            imageUrl
        });
        
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error en createProduct:', error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, descripcion, categoryId, imageUrl } = req.body;
        
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        await product.update({
            nombre,
            precio,
            descripcion,
            categoryId,
            imageUrl
        });
        
        res.json(product);
    } catch (error) {
        console.error('Error en updateProduct:', error);
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        await product.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error en deleteProduct:', error);
        res.status(500).json({ message: error.message });
    }
};