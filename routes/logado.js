
var express = require('express')
var router = express.Router()
const { verificaUser,verificaADM, verificaTipo, verificaLogado } = require('../controleAcesso');
const { Op } = require('sequelize');
const Musica = require('../banco/musica')
const Banda = require('../banco/banda')
const Album = require('../banco/album')
router.use(express.json());

router.get('/musicas' ,verificaLogado, async (req,res)  => {
        try{
            const musicas = await Musica.findAll()
            res.json(musicas)
        }catch(error){
            res.status(400).send(error)
        }
})

router.get('/bandas', verificaLogado, async (req,res) =>{
    try{
        const bandas = await Banda.findAll()
        res.json(bandas)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/albuns', verificaLogado, async (req,res) =>{
    try{
        const albuns = await Album.findAll()
        res.json(albuns)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/BuscaMusica/:id', verificaLogado, async (req,res) =>{
    const id = parseInt(req.params.id)
    if(!isNaN(id)){
        try{
            const musica = await Musica.findAll({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            })
            res.json(musica)
        }catch(error){
            res.status(400).send(error)
        }            
    } else {
        res.status(400).send({mensagem:"envie um parametro"})
    }
})

router.get('/BuscaMusicaPorAlbum/:id', verificaLogado, async (req,res) =>{
    const id = parseInt(req.params.id)
    if(!isNaN(id)){
        try{
            const musicas = await Musica.findAll({
                where: {
                    Albumid: {
                        [Op.eq]: id
                    }
                }
            })
            res.json(musicas)
        }catch(error){
            res.status(400).send(error)
        }            
    } else {
        res.status(400).send({mensagem:"envie um parametro"})
    }
})



module.exports = router
