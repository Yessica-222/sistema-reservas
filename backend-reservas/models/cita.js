const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const usuario = require('./usuario');
const servicio = require('./servicio');

const cita = sequelize.define('cita', {
  id_cita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada', 'completada'),
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'citas',
  timestamps: false
});

// Relaciones
usuario.hasMany(cita, { foreignKey: 'id_usuario' });
cita.belongsTo(usuario, { foreignKey: 'id_usuario' });

servicio.hasMany(cita, { foreignKey: 'id_servicio' });
cita.belongsTo(servicio, { foreignKey: 'id_servicio' });

module.exports = cita;
