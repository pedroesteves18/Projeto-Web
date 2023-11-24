const swaggerAutogen = require('swagger-autogen')()

output = './swagger_doc.json'
endpoints = ['./routes/api.js', './routes/apiBanco.js', './routes/busca.js', './routes/instalacao']

const doc = {
    info: {
        version: '1.0',
        title: 'Banco de musicas',
        description: 'API REST com uso de sequelize mySQL, que gerencia usuarios, ADM e USER, para um banco de dados de musica'
    }
}
swaggerAutogen(output, endpoints, doc)