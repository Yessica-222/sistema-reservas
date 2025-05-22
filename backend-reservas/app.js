const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Prueba conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a MySQL establecida correctamente.'))
  .catch(err => console.error('❌ Error al conectar a la base de datos:', err));

// Importa modelos y sincroniza tablas
require('./models');

// Rutas
const authRoutes = require('./routes/authRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const citaRoutes = require('./routes/citaRoutes');
const pagoRoutes = require('./routes/pago');
const medioPagoRoutes = require('./routes/medio_pago');
// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/medios_pago', medioPagoRoutes);
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
