const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'Products',
    timestamps: true
});

// Relaciones
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'categoria' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;