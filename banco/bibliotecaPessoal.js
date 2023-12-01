const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Biblioteca = sequelize.define('biblioteca', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
const User = require('./usuarios')
const Musica = require('./musica')

User.hasOne(Biblioteca)
Biblioteca.belongsTo(User)

Musica.belongsToMany(Biblioteca, { through: 'MusicaBiblioteca' });
Biblioteca.belongsToMany(Musica, { through: 'MusicaBiblioteca' });

module.exports = Biblioteca;