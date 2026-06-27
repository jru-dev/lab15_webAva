const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
        
        await sequelize.sync({ alter: true });
        console.log('✅ Base de datos sincronizada correctamente');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📦 Endpoints disponibles:`);
            console.log(`   GET    /api/products`);
            console.log(`   GET    /api/products/:id`);
            console.log(`   POST   /api/products`);
            console.log(`   PUT    /api/products/:id`);
            console.log(`   DELETE /api/products/:id`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();