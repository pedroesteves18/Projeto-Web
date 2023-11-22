const Sequelize = require('sequelize');
const sequelize = require('./db');
const Album = require('./album');

const Musica = sequelize.define('Musica', {
  id: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duracao: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Musica.belongsTo(Album);
Album.hasMany(Musica);

module.exports = Musica;