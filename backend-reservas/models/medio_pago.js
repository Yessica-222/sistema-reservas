const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const medioPago = sequelize.define('medio_pago', {
  id_medio_pago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipo_pago: {
    type: DataTypes.ENUM('efectivo', 'transferencia'),
    allowNull: false
  }
}, {
  tableName: 'medios_pago',
  timestamps: false
});

module.exports = medioPago;
