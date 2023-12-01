const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Admin = sequelize.define('Admin', {
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  });

module.exports = Admin