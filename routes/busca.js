
var express = require('express')
var router = express.Router()
const { verificaUser,verificaADM, verificaTipo, verificaLogado } = require('../controleAcesso');
const { Op } = require('sequelize');
const Musica = require('../banco/musica')
const Banda = require('../banco/banda')
const Album = require('../banco/album')
router.use(express.json());

router.get('/musicas/:limite/:pagina' ,verificaLogado, async (req,res)  => {
        const limite = parseInt(req.params.limite)
        const pagina = parseInt(req.params.pagina)
        try{
            const itensMostrar = (pagina - 1) * limite;
            const musicas = await Musica.findAll({
                    limit: limite,
                    offset: itensMostrar
            })
            res.json(musicas)
        }catch(error){
            res.status(400).send(error)
        }
})

router.get('/bandas/:limite/:pagina', verificaLogado, async (req,res) =>{
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    try{
        const itensMostrar = (pagina - 1) * limite;
        const bandas = await Banda.findAll({
            limit: limite,
            offset: itensMostrar
    })
        res.json(bandas)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/albuns/:limite/:pagina', verificaLogado, async (req,res) =>{
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    try{
        const itensMostrar = (pagina - 1) * limite;
        const albuns = await Album.findAll({
            limit: limite,
            offset: itensMostrar
    })
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
                    },
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

router.get('/album/:id/musicas/:limite/:pagina', verificaLogado, async (req,res) =>{
    const id = parseInt(req.params.id)
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if(!isNaN(id)){
        try{
            const itensMostrar = (pagina - 1) * limite;
            const musicas = await Musica.findAll({
                limit: limite,
                offset: itensMostrar},
            {
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

router.get('/banda/:id/musicas/:limite/:pagina', verificaLogado, async(req,res)=>{
    const id = parseInt(req.params.id);
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if(!isNaN(id)){
        try {
            const itensMostrar = (pagina - 1) * limite;
            const banda = await Banda.findByPk(id,
            {
              include: {
                limit: limite,
                offset: itensMostrar, 
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

router.get('/banda/:id/albuns/:limite/:pagina', verificaLogado, async(req,res)=>{
    const id = parseInt(req.params.id);
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if(!isNaN(id)){
        try {
            const itensMostrar = (pagina - 1) * limite;
            const banda = await Banda.findByPk(id,
            {
              include: {
                model: Album,
                limit: limite,
                offset: itensMostrar, 
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
