const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Album = sequelize.define('Album', {
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anoLancamento: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

module.exports = Album;