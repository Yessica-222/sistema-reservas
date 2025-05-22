const sequelize = require('../config/db');
const usuario = require('./usuario');
const servicio = require('./servicio');
const cita = require('./cita');

// Importante: Importar relaciones
require('./cita');

// Sincroniza las tablas (¡esto crea las tablas si no existen!)
sequelize.sync({ force: false })
  .then(() => console.log('✅ Tablas sincronizadas'))
  .catch(err => console.error('❌ Error al sincronizar tablas:', err));

module.exports = { usuario, servicio, cita };
