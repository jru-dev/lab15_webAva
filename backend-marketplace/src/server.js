const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
        
        // En producción, no usar alter: true para evitar pérdida de datos
        if (process.env.NODE_ENV === 'production') {
            await sequelize.sync();
        } else {
            await sequelize.sync({ alter: true });
        }
        console.log('✅ Base de datos sincronizada correctamente');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();