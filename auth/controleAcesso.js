const jwt = require('jsonwebtoken');
const Usuarios = require('../functions/funcoesUsers')
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
