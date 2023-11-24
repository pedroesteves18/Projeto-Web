const express = require('express')
const app = express()
const port = 3000
const apiRouter = require('./routes/api');
const bancoInstall = require('./routes/instalacao')
const buscaRouter = require('./routes/busca')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/instalacao', bancoInstall)
app.use('/api', apiRouter);
app.use('/logado', buscaRouter);
const sequelize = require('./banco/db');

sequelize.sync({ force: false }).then(() => {
  console.log('Modelos sincronizados com o banco de dados.');
});

app.listen(port, () =>{
    console.log("funcionando...")
})

module.exports = app;
