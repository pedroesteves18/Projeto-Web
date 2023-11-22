const Sequelize = require('sequelize');
const sequelize = require('./db');
const Banda = require('./banda');

const Album = sequelize.define('Album', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    anoLancamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Album.belongsTo(Banda);
Banda.hasMany(Album);

module.exports = Album;