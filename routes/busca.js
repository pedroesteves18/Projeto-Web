
var express = require('express')
var router = express.Router()
const { verificaLogado, verificaUserLogado } = require('../auth/controleAcesso');
const {verificaBiblioteca, adicionaMusica, getBiblioteca, deleteMusica, deleteBiblioteca} = require('../auth/controleBiblioteca')
const { Op } = require('sequelize');
const Musica = require('../banco/musica')
const Banda = require('../banco/banda')
const Album = require('../banco/album')
const Biblioteca = require('../banco/bibliotecaPessoal')
router.use(express.json());

router.get('/musicas/:limite/:pagina' ,verificaLogado, async (req,res)  => {
    // #swagger.summary = 'usuario logado lista musicas por paginacao'
        const limite = parseInt(req.params.limite)
        const pagina = parseInt(req.params.pagina)
        if ((limite !== 30) && (limite !== 10) && (limite !== 5)) {
            res.status(400).json({ error: "valor limite inválido!" });
            return;
        }
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
    // #swagger.summary = 'usuario logado lista bandas por paginacao'
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if ((limite !== 30) && (limite !== 10) && (limite !== 5)) {
        res.status(400).json({ error: "valor limite inválido!" });
        return;
    }
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
    // #swagger.summary = 'usuario logado lista albuns por paginacao'
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if ((limite !== 30) && (limite !== 10) && (limite !== 5)) {
        res.status(400).json({ error: "valor limite inválido!" });
        return;
    }
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
    // #swagger.summary = 'usuario logado procura musica por ID'
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
    // #swagger.summary = 'usuario logado procura album por ID'
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
        res.status(400).send({mensagem:"erro ao procurar um album"})
    }
})

router.get('/banda/:id', verificaLogado, async (req,res) =>{
    // #swagger.summary = 'usuario logado procura album por ID'
    const id = parseInt(req.params.id)
    if(!isNaN(id)){
        try{
            const banda = await Banda.findOne({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            })
            res.json(banda)
        }catch(error){
            res.status(400).send(error)
        }            
    } else {
        res.status(400).send({mensagem:"erro ao procurar uma banda"})
    }
})

router.get('/album/:id/musicas/:limite/:pagina', verificaLogado, async (req,res) =>{
    // #swagger.summary = 'usuario logado procura musica por ID de album com paginacao'
    const id = parseInt(req.params.id)
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if ((limite !== 30) && (limite !== 10) && (limite !== 5)) {
        res.status(400).json({ error: "valor limite inválido!" });
        return;
    }
    if(!isNaN(id)){
        try{
            const itensMostrar = (pagina - 1) * limite;
            const album = await Album.findByPk(id,
            {
              include: {
                model: Musica,
                limit: limite,
                offset: itensMostrar, 
              },
            });
            if (!album) {
                res.status(404).json({ error: 'Banda não encontrada.' });
            }
            const musicas = [];
        
            album.Musicas.forEach(musica => {
                musicas.push({
                  id: musica.id,
                  nome: musica.nome,
                  duracao: musica.duracao,
                });
            });
        
            res.json({banda:album.nome ,musicas: musicas});
        }catch(error){
            res.status(400).send(error)
        }            
    } else {
        res.status(400).send({mensagem:"erro ao procurar as musicas de um album"})
    }
})

router.get('/banda/:id/musicas/:limite/:pagina', verificaLogado, async(req,res)=>{
        // #swagger.summary = 'usuario logado procura musica por ID de banda com paginacao'
    const id = parseInt(req.params.id);
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if ((limite !== 30) && (limite !== 10) && (limite !== 5)) {
        res.status(400).json({ error: "valor limite inválido!" });
        return;
    }
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
                res.status(404).json({ error: 'Banda não encontrada.' });
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
            res.status(500).json({ error: error.message });
          }
    } else {
        res.status(400).send({mensagem:"Erro ao procurar as musicas da banda"})
    }
    ;
})

router.get('/banda/:id/albuns/:limite/:pagina', verificaLogado, async(req,res)=>{
        // #swagger.summary = 'usuario logado procura albuns por ID de banda com paginacao'
    const id = parseInt(req.params.id);
    const limite = parseInt(req.params.limite)
    const pagina = parseInt(req.params.pagina)
    if ((limite !== 30) && (limite !== 10) && (limite !== 5)) {
        res.status(400).json({ error: "valor limite inválido!" });
        return;
    }
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
                res.status(404).json({ error: 'Banda não encontrada.' });
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
            res.status(500).json({ error: error.message });
          }
    } else {
        res.status(400).send({mensagem:"erro ao procurar albuns da banda"})
    }
})

///////////////////////////// logica de negocio ///////////////////////////////////
router.post('/criarBiblioteca', verificaBiblioteca, async(req,res) => {
    // #swagger.summary = 'cria uma biblioteca para o usuario logado'
})
router.post('/biblioteca/musica/:id', adicionaMusica, async(req,res) => {
    // #swagger.summary = 'adiciona uma musica na biblioteca para o usuario logado'

})

router.get('/MinhaBiblioteca', getBiblioteca,async(req,res) => {
    // #swagger.summary = 'mostra a biblioteca do usuario logado'

})

router.delete('/biblioteca/musica/:id', deleteMusica, async(req,res) => {
    // #swagger.summary = 'deleta uma musica da biblioteca do usuario logado'
})

router.delete('/biblioteca', deleteBiblioteca, async(req,res)=>{
    // #swagger.summary = 'deleta a biblioteca do usuario logado'
})

module.exports = router
