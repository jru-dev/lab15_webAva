const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

// Verificar token
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No hay token, autorización denegada' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.userId = decoded.id;
        req.userRolId = decoded.rolId;
        req.userRol = decoded.rol;
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

// Verificar rol ADMIN
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: Role, as: 'rol' }]
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.rol.nombre !== 'ADMIN') {
            return res.status(403).json({ message: 'Acceso denegado. Se requiere rol ADMIN' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al verificar rol' });
    }
};

// Verificar rol CUSTOMER o ADMIN
exports.isCustomerOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: Role, as: 'rol' }]
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.rol.nombre !== 'ADMIN' && user.rol.nombre !== 'CUSTOMER') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al verificar rol' });
    }
};