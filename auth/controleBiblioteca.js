const jwt = require('jsonwebtoken');
const Usuarios = require('../model/usuarios')
const SECRET_KEY = 'segredo';
module.exports= {
    verificaBiblioteca: async function(req,res,next){
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
                next()
            } else{
                res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
            }            
        }catch(error){
            res.status(400).json({erro:error.message})
        } 
    },
    adicionaMusica: async function(req,res,next){
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
                next()
            } else{
                res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
            }            
        }catch(error){
            res.status(400).json({erro:error.message})
        }         
    },
    getBiblioteca: async function(req,res,next){
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
                next()
            } else{
                res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
            }            
        }catch(error){
            res.status(400).json({erro:error.message})
        }        
    },
    deleteMusica: async function(req,res,next){
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
                next()
            } else{
                res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
            }            
        }catch(error){
            res.status(400).json({erro:error.message})
        }        
    },
    deleteBiblioteca: async function(req,res,next){
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
                next()
            } else{
                res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado como usuario comum." });
            }            
        }catch(error){
            res.status(400).json({erro:error.message})
        }         
    }
}
