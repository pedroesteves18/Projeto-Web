const jwt = require('jsonwebtoken');
const Usuarios = require('../model/usuarios')
const SECRET_KEY = 'segredo';
module.exports= {
    verificaADM: function(req, res, next) {
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

            if (decodedToken.roles === 'adm') {
                next();
            } else {
                res.status(403).json({ mensagem: "Acesso negado. Você não é um administrador autenticado." });
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Não logado como adm", erro: error.message });
        }
    },
    verificaUser: async function (req, res, next) {
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
    },
    verificaTipo: async function(req,res,next){
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
    },
    verificaLogado: function(req,res,next){
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
            if(decodedToken.roles === 'adm' || decodedToken.roles === 'user'){
                next()
            } else{
                res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado." });
            }            
        }catch(error){
            res.status(400).json({erro:error})
        }
    }
}
