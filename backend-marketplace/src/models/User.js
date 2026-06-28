const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Role = require('./Role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'id'
        }
    }
}, {
    tableName: 'Users',
    timestamps: true
});

// Relaciones
User.belongsTo(Role, { foreignKey: 'rolId', as: 'rol' });
Role.hasMany(User, { foreignKey: 'rolId' });

module.exports = User;