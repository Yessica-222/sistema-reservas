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

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
