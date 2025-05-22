const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const usuario = require('./usuario');
const cita = require('./cita');
const medioPago = require('./medio_pago');

const pago = sequelize.define('pago', {
  id_pago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'pagos',
  timestamps: false
});

// Relaciones
usuario.hasMany(pago, { foreignKey: 'id_usuario' });
pago.belongsTo(usuario, { foreignKey: 'id_usuario' });

cita.hasOne(pago, { foreignKey: 'id_cita' });
pago.belongsTo(cita, { foreignKey: 'id_cita' });

medioPago.hasMany(pago, { foreignKey: 'id_medio_pago' });
pago.belongsTo(medioPago, { foreignKey: 'id_medio_pago' });

module.exports = pago;
