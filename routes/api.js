var express = require('express')
var router = express.Router()
var discos = []
var id = 0

router.get('/', (req,res)=> {
    res.json({mensagem: "oi"})
})

router.post('/', (req,res) => {
    id++
    const disco = [req.body.musica,req.body.banda,req.body.estilo,id]
    discos.push[disco]
    res.json({disco: disco})
})

router.put('/:id', (req,res) => {
    const idAtt = req.params.id
    const disco = [req.body.musica,req.body.banda,req.body.estilo, idAtt]
    discos[idAtt] = disco
    res.json({mensagem: "disco atualizado", disco: discos[idAtt]})
})

module.exports = router;