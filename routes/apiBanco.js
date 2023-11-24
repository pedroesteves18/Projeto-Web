
var express = require('express')
var router = express.Router()
const { verificaUser,verificaADM, verificaTipo, verificaLogado } = require('../controleAcesso');
const { Op } = require('sequelize');
const Musica = require('../banco/musica')
const Banda = require('../banco/banda')
const Album = require('../banco/album')
router.use(express.json());

router.post('/inserir/banda', verificaADM ,async (req,res) => {
    try {
        const { nome, paisOrigem } = req.body;
        const novaBanda = await Banda.create({ nome, paisOrigem })
    
        res.status(200).json(novaBanda)
      } catch (error) {
        res.status(500).json({ error: 'erro ao criar banda' })
      }
})

router.post('/inserir/album/:bandaId', verificaADM ,async (req,res) => {
    try{
        const bandaId = parseInt(req.params.bandaId)
        const banda = await Banda.findByPk(bandaId)
        if(!banda){
            res.status(500).json({error:'banda nao encontrada'})
        }

        const {genero,titulo,anoLancamento} = req.body

        const novoAlbum = await Album.create({genero,titulo,anoLancamento,BandaId: banda.id})
        res.status(200).json(novoAlbum)
    } catch(error){
        res.status(500).json({error: 'erro ao criar album'})
    }
})

router.post('/inserir/album/:id/musica', verificaADM,async (req,res) => {
    try{
        const albumId = parseInt(req.params.id)
        const album = await Album.findByPk(albumId)

        if(!album){
            res.status(500).json({error: "album nao encontrado"})
        }

        const {nome,duracao} = req.body
        const novaMusica = await Musica.create({
            nome: nome,
            duracao: duracao,
            AlbumId: albumId
        })
        res.status(200).json(novaMusica)
    } catch(error){
        res.status(500).json({error: 'erro ao criar a musica'})
    }
})

router.delete('/excluir/banda/:id', verificaADM,async(req,res) => {
    try{
        const bandaId = parseInt(req.params.id)
        const banda = await Banda.findByPk(bandaId)
        if(!banda){
            res.status(500).json({error: "banda nao encontrada"})
        }
        const bandaExcluida = await Banda.destroy({
            where: {
                id: bandaId
            }
        })
        res.status(200).json({bandaExcluida: bandaExcluida})
    }catch(error){
        res.status(500).json({error: 'erro ao excluir a banda'})
    }
})

router.delete('/excluir/album/:id', verificaADM, async(req,res) => {
    try{
        const albumId = parseInt(req.params.id)
        const album = await Album.findByPk(albumId)
        if(!album){
            res.status(500).json({error:"album nao encontrado"})
        }
        const albumExcluido = await Album.destroy({
            where:{
                id: albumId
            }
        })
        res.status(200).json({albumExcluido: albumExcluido})
    }catch(error){
        res.status(500).json({error: 'erro ao excluir o album'})
    }
})

router.delete('/excluir/musica/:id', verificaADM, async(req,res) => {
    try{
        const musicaId = parseInt(req.params.id)
        const musica = await Musica.findByPk(musicaId)
        if(!musica){
            res.status(500).json({error:"musica nao encontrada"})
        }
        const musicaExcluida = await Musica.destroy({
            where:{
                id: musicaId
            }
        })
        res.status(200).json({musicaExcluida: musicaExcluida})
    }catch(error){
        res.status(500).json({error: 'erro ao excluir a musica'})
    }
})


module.exports = router