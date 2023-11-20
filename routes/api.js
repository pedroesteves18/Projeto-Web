var express = require('express')
var router = express.Router()
var Usuarios = require('../usuarios')
router.use(express.json());


router.get('/install', (req,res)=> {
    res.json({mensagem: "discos"})
})

router.get('/', (req,res) => {
    let adm = Usuarios.novoAdmin("adm1","senha1")
    res.json({mensagem: adm})
})

router.post('/login', (req,res) => {
    try{
        let usuario= req.body.usuario
        let senha = req.body.senha
        userChecagem = Usuarios.getUsuario(usuario,senha)
        if(userChecagem === null){
            res.status(403).send({mensagem: "usuario nao encontrado"})
        } else {
            res.status(200).send({mensagem:"usuario encontrado", user: userChecagem})
        }
    } catch(error){
        res.status(400).send({erro: error.message})
    }
})

router.post('/cadastroUser', (req,res) => {
    try{
        const {usuario,senha,idade,nome,cidade} = req.body
        let user = Usuarios.novoUsuario(usuario,senha,idade,nome,cidade)
        res.status(200).send({mensagem: user})
    }catch(error){
        res.status(400).send({erro: error.message})
    }

})

router.put('/:id', (req,res) => {

    res.json({mensagem: ""})
})

router.delete('/:id', (req,res) => {
    res.json({mensage: ""})
})

module.exports = router;