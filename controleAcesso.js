const jwt = require('jsonwebtoken');
const Usuarios = require('./usuarios')
const SECRET_KEY = 'segredo';
module.exports= {
    verificaADM: function(req, res, next) {
        try {
            const token = req.headers.authorization;
    
            if (!token) {
                return res.status(403).json({ mensagem: "Acesso negado. Token não fornecido." });
            }
    
            const decodedToken = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    
            if (decodedToken.roles.includes('adm')) {
                next();
            } else {
                res.status(403).json({ mensagem: "Acesso negado. Você não é um administrador autenticado." });
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Não logado como adm", erro: error.message });
        }
    },
    verificaUser: function(req,res,next){
        const {usuario,senha} = req.body
        const user = Usuarios.getUsuario(usuario,senha)
        const adm = Usuarios.getADM(usuario,senha)
        try {
            if (user === null) {
              if (adm !== null) {
                const token = jwt.sign({ papel: "adm" }, SECRET_KEY, { expiresIn: 300 });
                console.log('adm encontrado')
                res.status(200).json({ mensagem: "ADM encontrado", token });
              } else {
                res.status(400).json({ mensagem: "usuario não cadastrado" });
              }
            } else {
              const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: 300 });
              res.status(200).json({ mensagem: "usuário encontrado", token });
            }
          } catch (error) {
            res.status(500).json({ erro: error.message });
          }
    }
}
