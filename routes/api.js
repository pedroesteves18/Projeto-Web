var express = require('express')
var router = express.Router()
var Usuarios = require('../model/usuarios');
const { verificaUser,verificaADM, verificaTipo } = require('../auth/controleAcesso');
const User = require('../banco/usuarios')
router.use(express.json());

router.get('/Users', async (req,res) => {
    // #swagger.summary = 'Lista todos os USUARIOS cadastrados'
    try{
        const usuarios = await Usuarios.listarUsers()
        res.status(200).send({usuarios: usuarios})     
    }catch(error){
        res.status(400).send({erro: "erro ao listar os usuarios"})
    }

})

router.put('/alterarUser', verificaTipo,(req,res) =>{
    // #swagger.summary = 'Um ADM altera um usuario cadastrado'
    res.json("alterado")
})

router.delete('/excluirUser/:id', verificaADM, async (req,res) => {
        // #swagger.summary = 'um ADM exclui um usuario cadastrado'
    try{
        const id = parseInt(req.params.id)
        const usuarioExcluido = await Usuarios.excluiUser(id)
        if(usuarioExcluido === null){
            res.status(300).send({mensagem: "usuario nao encontrado"})
        } else {
            res.status(200).send({excluido: usuarioExcluido})
        }
    }catch(error){
        res.status(400).send({erro:"erro ao excluir usuario"})
    }
})

router.post('/login', verificaUser, (req,res) => {
        // #swagger.summary = 'Loga usando um usuario e senha previamente cadastrados'
    res.json({logado: true})
})

router.post('/cadastroAdm', verificaADM, async (req,res) => {
        // #swagger.summary = 'Um ADM cadastra outro'
    try{
        const {usuario,senha} = req.body
        let Admcriado = await Usuarios.novoAdmin(usuario,senha)
        if(Admcriado === null){
            res.status(300).send({mensagem:"usuario ou senha já cadastrados!"})
        } else {
            res.status(200).send({mensagem:"admin criado!"})
        }
    }catch(error){
        res.status(400).send({erro: "erro ao cadastrar adm"})
    }
})

router.post('/cadastroUser', async (req,res) => {
        // #swagger.summary = 'O usuario pode cadastrar um USER comum'
    try{
        const { usuario,senha,cidade,nome, idade } = req.body;
        const Usercriado = await Usuarios.novoUsuario(usuario, senha, idade, nome, cidade)
        if(Usercriado === null){
            res.status(300).send({mensagem:"usuario ou senha já cadastrados!"})
        } else {
            res.status(200).send({mensagem:"usuario criado!"})
        }
    }catch(error){
        res.status(400).send({erro: "erro ao cadastrar-se"})
    }

})


module.exports = router;