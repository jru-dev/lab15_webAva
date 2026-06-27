// Importar el modelo correctamente
const Product = require('../models/Product');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        console.log('Product:', Product); // Esto te mostrará si Product está definido
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({ 
            message: error.message,
            stack: error.stack 
        });
    }
};
// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
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
        const { nombre, precio, descripcion } = req.body;
        
        const newProduct = await Product.create({
            nombre,
            precio,
            descripcion
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
        const { nombre, precio, descripcion } = req.body;
        
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        await product.update({
            nombre,
            precio,
            descripcion
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