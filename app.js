const express = require('express')
const app = express()
const port = 3000
const apiRouter = require('./routes/api');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', apiRouter);

(async () => {
    const banco = require('./banco/db');
    const musica = require('./banco/musica')
    const album = require('./banco/album')
    const banda = require('./banco/banda')
    await banco.sync()
})()

app.listen(port, () =>{
    console.log("funcionando...")
})

module.exports = app;
