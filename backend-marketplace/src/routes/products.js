const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Rutas públicas
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas (solo ADMIN)
router.post('/', verifyToken, isAdmin, productController.createProduct);
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;