const express = require('express')
const app = express()
const port = 3000
const apiRouter = require('./routes/api');
const bancoInstall = require('./routes/instalacao')
const buscaRouter = require('./routes/busca')
const apiBanco = require('./routes/apiBanco')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/instalacao', bancoInstall)
app.use('/api', apiRouter);
app.use('/logado', buscaRouter);
app.use('/apiBanco', apiBanco)
const sequelize = require('./banco/db');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_doc.json')
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

sequelize.sync({ force: false }).then(() => {
  console.log('Modelos sincronizados com o banco de dados.');
});

app.listen(port, () =>{
    console.log("funcionando...")
})

module.exports = app;
