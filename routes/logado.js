/*
var express = require('express')
var router = express.Router()
const { verificaUser,verificaADM, verificaTipo, verificaLogado } = require('../controleAcesso');
const banco = require('../funcao banco/funcoes')
router.use(express.json());

router.get('/musicas' ,verificaLogado, (req,res)  => {
    try{
        console.log("entrou")
        const musicas = banco.getTodasMusicas() 
        res.json(musicas)      
    }catch(error){
        res.json(error)
    }

})

module.exports = router
*/ 