const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('Usuario', {
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  });

module.exports = User