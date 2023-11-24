
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

router.get('/musica/:id', verificaLogado, async (req,res) =>{
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

router.get('/album/:id', verificaLogado, async (req,res) =>{
    const id = parseInt(req.params.id)
    if(!isNaN(id)){
        try{
            const album = await Album.findOne({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            })
            res.json(album)
        }catch(error){
            res.status(400).send(error)
        }            
    } else {
        res.status(400).send({mensagem:"envie um parametro"})
    }
})

router.get('/album/:id/musicas', verificaLogado, async (req,res) =>{
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

router.get('/banda/:id/musicas', verificaLogado, async(req,res)=>{
    const id = parseInt(req.params.id);
    if(!isNaN(id)){
        try {
            const banda = await Banda.findByPk(id, {
              include: {
                model: Album,
                include: Musica,
              },
            });
        
            if (!banda) {
              return res.status(404).json({ error: 'Banda não encontrada.' });
            }
        
            const musicas = [];
        
            banda.Albums.forEach(album => {
              album.Musicas.forEach(musica => {
                musicas.push({
                  id: musica.id,
                  nome: musica.nome,
                  duracao: musica.duracao,
                });
              });
            });
        
            res.json({musicas: musicas});
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
          }
    } else {
        res.status(400).send({mensagem:"envie um parametro correto!"})
    }
    ;
})

router.get('/banda/:id/albuns', verificaLogado, async(req,res)=>{
    const id = parseInt(req.params.id);
    if(!isNaN(id)){
        try {
            const banda = await Banda.findByPk(id, {
              include: {
                model: Album,
              },
            });
        
            if (!banda) {
              return res.status(404).json({ error: 'Banda não encontrada.' });
            }
            const albuns = [];
        
            banda.Albums.forEach(album => {
                albuns.push({
                  id: album.id,
                  titulo: album.titulo,
                  genero: album.genero,
                  anoLancamento: album.anoLancamento
                });
            });
        
            res.json({banda:banda.nome ,albuns: albuns});
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
          }
    } else {
        res.status(400).send({mensagem:"envie um parametro correto!"})
    }
})



module.exports = router
