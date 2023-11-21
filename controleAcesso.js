const jwt = require('jsonwebtoken');
const Usuarios = require('./usuarios')
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
    verificaUser: function(req, res, next) {
        const { usuario, senha } = req.body;
        const user = Usuarios.getUsuario(usuario, senha);
        const adm = Usuarios.getADM(usuario, senha);
        console.log({"usuario comum ": user})
        console.log({"adm ": adm})
        try {
            if (user === null && adm === null) {
                res.status(400).json({ mensagem: "usuário não cadastrado" });
            } else if (adm !== null) {
                const token = jwt.sign({ roles: "adm" }, SECRET_KEY, { expiresIn: 300 });
                console.log('adm encontrado');
                res.status(200).json({ mensagem: "ADM encontrado", token });
            } else if (user !== null && adm === null) {
                const UserId = user.id
                const token = jwt.sign({ UserId: user.id,roles: "user" }, SECRET_KEY, { expiresIn: 300 });
                res.status(200).json({ mensagem: "usuário encontrado", token });
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    verificaTipo: function(req,res,next){
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
            const id = parseInt(req.params.id)
            if (decodedToken.roles === 'adm'){
                const {usuario, senha, idade, nome, cidade} = req.body
                Usuarios.alterarUser(id,usuario, senha, idade, nome, cidade)
                next();
            } else if(decodedToken.roles === 'user' && decodedToken.UserId === id){
                const {usuario, senha, idade, nome, cidade} = req.body
                Usuarios.alterarUser(id,usuario, senha, idade, nome, cidade)
                next()
            }else {
                res.status(403).json({ mensagem: "Acesso negado. Você não esta autenticado." });
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Não logado", erro: error.message });
        }
    }
}
