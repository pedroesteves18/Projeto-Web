const Sequelize = require('sequelize')
const database = require('./db')

const Banda = database.define('Banda', {
    id:{ 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    paisOrigem: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

  module.exports = Banda;