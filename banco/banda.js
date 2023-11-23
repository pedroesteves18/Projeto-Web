const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Banda = sequelize.define('Banda', {

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paisOrigem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Banda;