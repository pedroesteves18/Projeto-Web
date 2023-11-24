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

  const Banda = require('./banda');
  const Musica = require('./musica');
  
  Banda.hasMany(Album, { onDelete: 'CASCADE'})
  Album.belongsTo(Banda)
  Album.hasMany(Musica, { onDelete: 'CASCADE' });
  Musica.belongsTo(Album);

module.exports = Album;