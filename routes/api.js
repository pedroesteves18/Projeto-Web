var express = require('express')
var router = express.Router()
var Usuarios = require('../functions/funcoesUsers');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'segredo'
const { verificaADM, verificaLogado } = require('../auth/controleAcesso');
const User = require('../banco/usuarios')
const { Op } = require('sequelize');
const Musica = require('../banco/musica')
const Banda = require('../banco/banda')
const Album = require('../banco/album')
router.use(express.json());

router.get('/Users', verificaADM,async (req,res) => {
    // #swagger.summary = 'Lista todos os USUARIOS cadastrados'
    try{
        const usuarios = await Usuarios.listarUsers()
        res.status(200).send({usuarios: usuarios})     
    }catch(error){
        res.status(400).send({erro: "erro ao listar os usuarios"})
    }

})

router.put('/alterarUser',async (req,res) =>{
    // #swagger.summary = 'Um ADM altera um usuario cadastrado'
    try {
        let bearToken = req.headers['authorization'] || ""
        let token = bearToken.split(" ")
        if(token[0] == "Bearer") {
            token = token[1]
        }
        if (!token) {   
            return res.status(403).json({ mensagem: "Acesso negado. Token não fornecido." });
        }
        let decodedToken = jwt.verify(token, SECRET_KEY);
        if (decodedToken.roles === 'adm'){
            const {id,usuario, senha, idade, nome, cidade} = req.body
            await Usuarios.alterarUser(id,usuario, senha, idade, nome, cidade)
            res.status(200).json({mensagem: "usuario alterado"})
        } else if(decodedToken.roles === 'user'){
            const idUser = decodedToken.UserId
            const {usuario, senha, idade, nome, cidade} = req.body
            await Usuarios.alterarUser(idUser,usuario, senha, idade, nome, cidade)
            res.status(200).json({mensagem: "seu usuario foi alterado"})
        }else {
            res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado." });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Não logado", erro: error.message });
    }
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

router.post('/login', async (req,res) => {
        // #swagger.summary = 'Loga usando um usuario e senha previamente cadastrados'
        const { usuario, senha } = req.body;
        const user = await Usuarios.getUsuario(usuario, senha);
        const adm = await Usuarios.getADM(usuario, senha);
        if (!user && !adm) {
            return res.status(404).json({ mensagem: "Usuário não cadastrado" });
        }
        try {
            if (adm) {
                const token = jwt.sign({ AdmId: adm.id, roles: "adm" }, SECRET_KEY, { expiresIn: 300 });
                return res.status(200).json({ mensagem: "ADM encontrado", token });
            }
            if (user){
                const token = jwt.sign({ UserId: user.id, roles: "user" }, SECRET_KEY, { expiresIn: 300 });
                return res.status(200).json({ mensagem: "Usuário encontrado", token });
            }
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
})

router.post('/cadastroAdm', verificaADM, async (req,res) => {
        // #swagger.summary = 'Um ADM cadastra outro'
    try{
        const {usuario,senha,idade,nome,cidade} = req.body
        let Admcriado = await Usuarios.novoAdmin(usuario,senha,idade,nome,cidade)
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








////////////////////////////////// OPERACOES CRUD ///////////////////////////////////









router.post('/banda', verificaADM ,async (req,res) => {
    // #swagger.summary = 'ADM Insere uma banda'
try {
    const { nome, paisOrigem } = req.body;
    const novaBanda = await Banda.create({ nome, paisOrigem })

    res.status(200).json(novaBanda)
  } catch (error) {
    res.status(500).json({ error: 'erro ao criar banda' })
  }
})

router.post('/album/:bandaId', verificaADM ,async (req,res) => {
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

router.post('/album/:id/musica', verificaADM,async (req,res) => {
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

router.delete('/banda/:id', verificaADM,async(req,res) => {
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

router.delete('/album/:id', verificaADM, async(req,res) => {
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

router.delete('/musica/:id', verificaADM, async(req,res) => {
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

router.put('/musica/:id', verificaADM, async (req,res) => {
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

router.put('/album/:id', verificaADM, async (req,res) => {
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

router.put('/banda/:id', verificaADM, async (req,res) => {
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






///////////////////////////////// OPERACOES DE BUSCA GET /////////////////////////////////////








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
            const NumeroMusicas = await Musica.count()
            var NumeroPaginas = (NumeroMusicas/limite)
            NumeroPaginas = Math.ceil(NumeroPaginas)
            res.json({musicas:musicas, NumeroPaginas: NumeroPaginas})
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
        const NumeroBandas = await Banda.count()
        var NumeroPaginas = (NumeroBandas/limite)
        res.json({bandas: bandas, NumeroPaginas: NumeroPaginas})
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
        const NumeroAlbuns = await Album.count()
        var NumeroPaginas = (NumeroAlbuns/limite)
        res.json({albuns:albuns, NumeroPaginas:NumeroPaginas})
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
                res.status(404).json({ error: 'Album não encontrado.' });
            }
            const musicas = [];
        
            album.Musicas.forEach(musica => {
                musicas.push({
                  id: musica.id,
                  nome: musica.nome,
                  duracao: musica.duracao,
                });
            });
            const NumeroMusicas = await Musica.count()
            var NumeroPaginas = (NumeroMusicas/limite)
            res.json({Musicas:musicas, NumeroPaginas:NumeroPaginas})
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
            const NumeroMusicas = await Musica.count()
            var NumeroPaginas = (NumeroMusicas/limite)
            res.json({Musicas:musicas, NumeroPaginas:NumeroPaginas})
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
            const NumeroAlbuns = await Album.count()
            var NumeroPaginas = (NumeroAlbuns/limite)
            res.json({albuns:albuns, NumeroPaginas:NumeroPaginas})
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
          }
    } else {
        res.status(400).send({mensagem:"erro ao procurar albuns da banda"})
    }
})





router.get('/banda/:id/Qtdmusicas', verificaLogado, async(req,res)=>{
    // #swagger.summary = 'usuario logado procura quantidade de musicas por ID de banda com paginacao'
    const id = parseInt(req.params.id);
    if(!isNaN(id)){
        try {
            const banda = await Banda.findByPk(id,
            {
            include: {
                model: Album,
                include: Musica,
            },
            });
            const nomeBanda = banda.nome
        
            if (!banda) {
                res.status(404).json({ error: 'Banda não encontrada.' });
            }
        
            const musicas = [];
            var valores = []
            var contador = 0
            banda.Albums.forEach(album => {
            album.Musicas.forEach(musica => {
                contador++
                musicas.push({
                id: musica.id,
                nome: musica.nome,
                duracao: musica.duracao,
                });
            });
            valores.push({nomeAlbum: album.titulo, qtdMusicas: contador})
            contador = 0
            });
            res.json({Banda:nomeBanda, album: valores})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).send({mensagem:"Erro ao procurar as musicas da banda"})
    }
})

router.get('/albuns/QtdPorGenero', verificaLogado, async(req,res)=>{
    // #swagger.summary = 'usuario logado procura quantidade de musicas por genero'
        try {
            const albums = await Album.findAll(
                {
                  include: {
                    model: Musica,
                  },
                });
            if (!albums) {
                res.status(404).json({ error: 'albums não encontrados.' });
            }
        
            var valores = []
            var contagemPorGenero = {};
            albums.forEach(album => {
                const genero = album.genero;
                const qtdMusicas = album.Musicas.length;
                if (!contagemPorGenero[genero]) {
                    contagemPorGenero[genero] = qtdMusicas;
                } else {
                    contagemPorGenero[genero] += qtdMusicas;
                }
            });
            valores.push(contagemPorGenero)
            res.json(valores)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
})

////////////////////////////// OPERACOES BIBLIOTECA PESSOAL /////////////////////////////////







router.post('/criarBiblioteca', async(req,res) => {
    // #swagger.summary = 'cria uma biblioteca para o usuario logado'
    try{
        let bearToken = req.headers['authorization'] || ""
        let token = bearToken.split(" ")
        if(token[0] == "Bearer") {
            token = token[1]
        }
        if (!token) {   
            return res.status(403).json({ mensagem: "Acesso negado. Token não fornecido." });
        }
        let decodedToken = jwt.verify(token, SECRET_KEY);
        if(decodedToken.roles === 'user'){
            const Biblioteca = require('../banco/bibliotecaPessoal')
            const UsuarioId = decodedToken.UserId
            const bibliotecaExistente = await Biblioteca.findOne({ where: { UsuarioId: UsuarioId } });
            if(bibliotecaExistente){
                res.status(400).json({mensagem:"já possui uma biblioteca"})
            } else {
                const nome = req.body.nome;
                const novaBiblioteca = await Biblioteca.create({ UsuarioId,nome, duracao: 0 });
                res.status(200).json({mensagem:"biblioteca criada com sucesso"})
            }
        } else{
            res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
        }            
    }catch(error){
        res.status(400).json({erro:error.message})
    }
})

router.post('/biblioteca/musica/:id', async(req,res) => {
    // #swagger.summary = 'adiciona uma musica na biblioteca para o usuario logado'
    try{
        let bearToken = req.headers['authorization'] || ""
        let token = bearToken.split(" ")
        if(token[0] == "Bearer") {
            token = token[1]
        }
        if (!token) {   
            return res.status(403).json({ mensagem: "Acesso negado. Token não fornecido." });
        }
        let decodedToken = jwt.verify(token, SECRET_KEY);
        if(decodedToken.roles === 'user'){
            const Biblioteca = require('../banco/bibliotecaPessoal')
            const Musica = require('../banco/musica')
            const UsuarioId = decodedToken.UserId
            const bibliotecaExistente = await Biblioteca.findOne({ where: { UsuarioId: UsuarioId } });
            if(bibliotecaExistente){
                const musicaId = req.params.id
                const musica = await Musica.findByPk(musicaId)
                await bibliotecaExistente.addMusica(musica);
                res.status(200).json({mensagme:"musica adicionada com sucesso!"})
            } else {
                res.status(200).json({mensagem:"biblioteca nao encontrada"})
            }
        } else{
            res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
        }            
    }catch(error){
        res.status(400).json({erro:error.message})
    } 

})

router.get('/MinhaBiblioteca',async(req,res) => {
    // #swagger.summary = 'mostra a biblioteca do usuario logado'
    try{
        let bearToken = req.headers['authorization'] || ""
        let token = bearToken.split(" ")
        if(token[0] == "Bearer") {
            token = token[1]
        }
        if (!token) {   
            return res.status(403).json({ mensagem: "Acesso negado. Token não fornecido." });
        }
        let decodedToken = jwt.verify(token, SECRET_KEY);
        if(decodedToken.roles === 'user'){
            
            const Biblioteca = require('../banco/bibliotecaPessoal')
            const Musica = require('../banco/musica')
            const UsuarioId = decodedToken.UserId
            const bibliotecaExistente = await Biblioteca.findOne({ where: { UsuarioId: UsuarioId } });
            if(bibliotecaExistente){
                const biblioteca = await Biblioteca.findByPk(bibliotecaExistente.id,
                    {
                      include: {
                        model: Musica,
                      },
                    });
                const musicas = [];
    
                biblioteca.Musicas.forEach(musica => {
                    musicas.push({
                        id: musica.id,
                        nome: musica.nome,
                        duracao: musica.duracao
                    });
                });
                res.status(200).json({biblioteca: biblioteca.nome,musicas: musicas})
            } else {
                res.status(200).json({mensagem:"biblioteca nao encontrada"})
            }
        } else{
            res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
        }            
    }catch(error){
        res.status(400).json({erro:error.message})
    } 

})

router.delete('/biblioteca/musica/:id', async(req,res) => {
    // #swagger.summary = 'deleta uma musica da biblioteca do usuario logado'
    try{
        let bearToken = req.headers['authorization'] || ""
        let token = bearToken.split(" ")
        if(token[0] == "Bearer") {
            token = token[1]
        }
        if (!token) {   
            return res.status(403).json({ mensagem: "Acesso negado. Token não fornecido." });
        }
        let decodedToken = jwt.verify(token, SECRET_KEY);
        if(decodedToken.roles === 'user'){
            const Biblioteca = require('../banco/bibliotecaPessoal')
            const Musica = require('../banco/musica')
            const UsuarioId = decodedToken.UserId
            const bibliotecaExistente = await Biblioteca.findOne({ where: { UsuarioId: UsuarioId } });
            if(bibliotecaExistente){
                const musica = req.params.id
                const musicaExcluida = await bibliotecaExistente.removeMusica(musica)

                res.status(200).json({biblioteca: musicaExcluida})
            } else {
                res.status(300).json({mensagem:"biblioteca nao encontrada"})
            }
        } else{
            res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
        }            
    }catch(error){
        res.status(400).json({erro:error.message})
    } 
})

router.delete('/biblioteca',async(req,res)=>{
    // #swagger.summary = 'deleta a biblioteca do usuario logado'
    try{
        let bearToken = req.headers['authorization'] || ""
        let token = bearToken.split(" ")
        if(token[0] == "Bearer") {
            token = token[1]
        }
        if (!token) {   
            return res.status(403).json({ mensagem: "Acesso negado. Token não fornecido." });
        }
        let decodedToken = jwt.verify(token, SECRET_KEY);
        if(decodedToken.roles === 'user'){
            const Biblioteca = require('../banco/bibliotecaPessoal')
            const UsuarioId = decodedToken.UserId
            const bibliotecaExistente = await Biblioteca.findOne({ where: { UsuarioId: UsuarioId } });
            if(bibliotecaExistente){
                const bibliotecaDestruida = await Biblioteca.destroy({
                    where: {
                        id: bibliotecaExistente.id
                    }
                })
                res.status(200).json({biblioteca: bibliotecaDestruida})
            } else {
                res.status(300).json({mensagem:"biblioteca nao encontrada"})
            }
        } else{
            res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
        }            
    }catch(error){
        res.status(400).json({erro:error.message})
    } 
})

module.exports = router;