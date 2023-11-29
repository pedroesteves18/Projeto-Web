
var express = require('express')
var router = express.Router()
const { verificaADM } = require('../auth/controleAcesso');
const { Op } = require('sequelize');
const Musica = require('../banco/musica')
const Banda = require('../banco/banda')
const Album = require('../banco/album')
router.use(express.json());

router.post('/inserir/banda', verificaADM ,async (req,res) => {
        // #swagger.summary = 'ADM Insere uma banda'
    try {
        const { nome, paisOrigem } = req.body;
        const novaBanda = await Banda.create({ nome, paisOrigem })
    
        res.status(200).json(novaBanda)
      } catch (error) {
        res.status(500).json({ error: 'erro ao criar banda' })
      }
})

router.post('/inserir/album/:bandaId', verificaADM ,async (req,res) => {
    // #swagger.summary = 'ADM Insere um album em uma banda'
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
    // #swagger.summary = 'ADM Insere uma musica em um album'
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
    // #swagger.summary = 'ADM exclui uma banda'
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
    // #swagger.summary = 'ADM Insere um album'
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
    // #swagger.summary = 'ADM exclui uma musica'
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

router.put('/alterar/musica/:id', verificaADM, async (req,res) => {
    // #swagger.summary = 'ADM altera uma musica'
    try{
        const musicaId = parseInt(req.params.id)
        const musica = await Musica.findByPk(musicaId)
        if(!musica){
            res.status(500).json({error:"musica nao encontrada"})
        }
        const musicaAlterada = await Musica.update({duracao: req.body.duracao,nome: req.body.nome},{
            where:{
                id: musicaId
            }
        })
        res.status(200).json({musicaAlterada: musicaAlterada})
    }catch(error){
        res.status(500).json({error: 'erro ao alterar a musica'})
    }
})

router.put('/alterar/album/:id', verificaADM, async (req,res) => {
    // #swagger.summary = 'ADM altera um album'
    try{
        const albumId = parseInt(req.params.id)
        const album = await Album.findByPk(albumId)
        if(!album){
            res.status(500).json({error:"album nao encontrado"})
        }
        const albumAlterado = await Album.update({genero: req.body.genero,titulo: req.body.titulo},{
            where:{
                id: albumId
            }
        })
        res.status(200).json({albumAlterado: albumAlterado})
    }catch(error){
        res.status(500).json({error: 'erro ao alterar o album'})
    }
})

router.put('/alterar/banda/:id', verificaADM, async (req,res) => {
    // #swagger.summary = 'ADM altera uma banda'
    try{
        const bandaId = parseInt(req.params.id)
        const banda = await Album.findByPk(bandaId)
        if(!banda){
            res.status(500).json({error:"banda nao encontrada"})
        }
        const bandaAlterada = await Banda.update({nome: req.body.nome,paisOrigem: req.body.paisOrigem},{
            where:{
                id: bandaId
            }
        })
        res.status(200).json({bandaAlterada: bandaAlterada})
    }catch(error){
        res.status(500).json({error: 'erro ao alterar a banda'})
    }
})

module.exports = router