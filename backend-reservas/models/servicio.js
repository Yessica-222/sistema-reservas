const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const servicio = sequelize.define('servicio', {
  id_servicio: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_servicio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duracion: {
    type: DataTypes.INTEGER, // duración en minutos
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  tableName: 'servicios',
  timestamps: false
});

module.exports = servicio;
