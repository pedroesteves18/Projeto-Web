const express = require('express')
const app = express()
const port = 3000
const apiRouter = require('./routes/api');
const bancoInstall = require('./routes/instalacao')
//const logadoRouter = require('./routes/logado')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/instalacao', bancoInstall)
app.use('/api', apiRouter);
//app.use('/logado', logadoRouter);

const sequelize = require('./banco/db');
const Banda = require('./banco/banda');
const Album = require('./banco/album');
const Musica = require('./banco/musica');

Banda.hasMany(Album, { onDelete: 'CASCADE'})
Album.belongsTo(Banda)
Album.hasMany(Musica, { onDelete: 'CASCADE' });
Musica.belongsTo(Album);

sequelize.sync({ force: false }).then(() => {
  console.log('Modelos sincronizados com o banco de dados.');
});

app.listen(port, () =>{
    console.log("funcionando...")
})

module.exports = app;
