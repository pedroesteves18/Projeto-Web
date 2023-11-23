const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Musica = sequelize.define('Musica', {
    duracao: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
 
  module.exports = Musica;