const jwt = require('jsonwebtoken');
const Usuarios = require('./usuarios')
const SECRET_KEY = 'segredo';
module.exports= {
    verificaADM: function(req,res,next){
        const { usuario, senha } = req.body;
        const adm = Usuarios.getADM(usuario, senha);
        if(adm === null){
            res.status(400).json({mensagem:"nao é adm"})
        } else {
            try{
                const token = jwt.sign({ usuario,papel: "adm" }, SECRET_KEY, { expiresIn: 300 }); 
                req.token = token
                next()               
            } catch (error) {
                res.status(500).json({erro: error.message})
            }
        }
    },
    verificaUser: function(req,res,next){
        const {usuario,senha} = req.body
        const user = Usuarios.getUsuario(usuario,senha)
        if(usuario === "adm1" && senha === "senha1"){
            try{
                const token = jwt.sign({ usuario,papel: "adm" }, SECRET_KEY, { expiresIn: 300 }); 
                req.token = token
                res.status(300).json({mensagem:"adm encontrado", token})
                next()               
                return
            } catch (error) {
                res.status(500).json({erro: error.message})
            }            
        }

        if(user === null){
            res.status(400).json({mensagem:"usuario nao cadastrado"})
        } else {
            try{
                const token = jwt.sign({usuario} , SECRET_KEY, { expiresIn: 300 });
                res.status(300).json({mensagem:"usuario encontrado", token}) 
                next()               
            } catch (error) {
                res.status(500).json({erro: error.message})
            }
        }
    }
}
