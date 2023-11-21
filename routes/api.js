var express = require('express')
var router = express.Router()
var Usuarios = require('../usuarios');
const { verificaUser,verificaADM } = require('../controleAcesso');
router.use(express.json());


router.get('/install', (req,res)=> {
    res.json({mensagem: "discos"})
})

router.get('/', (req,res) => {
    let adm = Usuarios.novoAdmin("adm1","senha1")
    console.log(adm)
    res.json({mensagem: adm})
})

router.post('/login', verificaUser, (req,res) => {
    res.json({logado: true})
})
router.post('/cadastroAdm', verificaADM, (req,res) => {
    console.log('adm autorizado');
    try{
        const {usuario,senha} = req.body
        let admin = Usuarios.novoAdmin(usuario,senha)
        res.status(200).send({mensagem: admin})
    }catch(error){
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