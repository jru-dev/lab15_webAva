const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registrar usuario
exports.register = async (req, res) => {
    try {
        const { email, password, nombre, rolId } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Si no se envía rolId, asignar CUSTOMER (2)
        const roleId = rolId || 2;

        // Crear usuario
        const user = await User.create({
            email,
            password: hashedPassword,
            nombre,
            rolId: roleId
        });

        // Generar token
        const token = jwt.sign(
            { id: user.id, email: user.email, rolId: user.rolId },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                rolId: user.rolId
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario con su rol
        const user = await User.findOne({
            where: { email },
            include: [{ model: Role, as: 'rol' }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                rolId: user.rolId,
                rol: user.rol.nombre 
            },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                rolId: user.rolId,
                rol: user.rol.nombre
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

// Obtener usuario actual
exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: Role, as: 'rol' }],
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};