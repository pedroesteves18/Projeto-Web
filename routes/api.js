var express = require('express')
var router = express.Router()
var Usuarios = require('../usuarios');
const { verificaUser,verificaADM, verificaTipo } = require('../controleAcesso');
router.use(express.json());

router.get('/Users', (req,res) => {
    let usuarios = Usuarios.listarUsers()
    res.json({users: usuarios})
})
router.put('/alterarUser/:id', verificaTipo,(req,res) =>{
    res.json("alterado")
})

router.get('/', (req,res) => {
    let adm = Usuarios.novoAdmin("adm1","senha1")
    console.log(adm)
    res.json({mensagem: adm})
})

router.delete('/excluirUser/:id', verificaADM, (req,res) => {
    try{
        const id = parseInt(req.params.id)
        let usuarioExcluido = Usuarios.excluiUser(id)
        if(usuarioExcluido === null){
            console.log("usuario nao existente")
            res.status(300).send({excluido: usuarioExcluido})
        } else {
            console.log({"usuario excluido: ": usuarioExcluido})
            res.status(200).send({excluido: usuarioExcluido})
        }
    }catch(error){
        res.status(400).send({erro:error.message})
    }
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


module.exports = router;