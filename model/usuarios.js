var usuarios = []
var admin = []
var idAdm = 0
var idUser = 0

module.exports = {
    novoUsuario: function(usuario, senha, idade, nome, cidade) {
        const UserExiste  = usuarios.find(user=> user.usuario === usuario || user.senha === senha)
        if(UserExiste){
            return {error:"escolha um usuario ou senha diferente"}
        }
        idUser++
        if (usuario && senha && idade && nome && cidade) {
            const novoUsuario = {
                usuario: usuario,
                senha: senha,
                idade: idade,
                nome: nome,
                cidade: cidade,
                id: idUser,
                roles: "user"
            };
            usuarios.push(novoUsuario);
            return novoUsuario;
        } else {
            return null;
        }
    },
    novoAdmin: function(usuario, senha) {
        const admExiste = admin.find(adm => adm.usuario === usuario || adm.senha === senha)
        if (admExiste){
            return {error: "escolha um usuario ou senha diferente"}
        }
        idAdm++
        const novoAdm = {
            usuario: usuario,
            senha: senha,
            id: idAdm,
            roles: "adm"
        };
        admin.push(novoAdm);
        return novoAdm;
    },
    getUsuario: function(usuario, senha) {
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].usuario === usuario && usuarios[i].senha === senha) {
                return usuarios[i];
            }
        }
        return null;
    },
    getADM: function(usuario, senha) {
        for (var i = 0; i < admin.length; i++) {
            if (admin[i].usuario === usuario && admin[i].senha === senha) {
                return admin[i];
            }
        }
        return null;
    },
    excluiUser: function(id){
        for(var i =0; i<usuarios.length;i++){
            if(usuarios[i].id === id){
                let usuarioExcluido = usuarios.splice(i,1)
                return usuarioExcluido
            }
        }
        return null
    },
    listarUsers: function(){
        let usuariosImp= [] 
        for (var i = 0; i < usuarios.length; i++) {
            usuariosImp[i] = usuarios[i]
        }
        return usuariosImp;
    },
    alterarUser: function(id,usuario, senha, idade, nome, cidade){
        for (var i = 0; i < usuarios.length; i++) {
            if(usuarios[i].id === id){
                if(usuario === undefined){
                    usuario = usuarios[i].usuario
                }
                if(senha === undefined){
                    senha = usuarios[i].senha
                }
                if(idade === undefined){
                    idade = usuarios[i].idade
                }
                if(nome === undefined){
                    nome = usuarios[i].nome
                }
                if(cidade === undefined){
                    cidade = usuarios[i].cidade
                }
                usuarios[i].usuario = usuario
                usuarios[i].senha = senha
                usuarios[i].idade = idade
                usuarios[i].nome = nome
                usuarios[i].cidade = cidade
                return usuarios[i]
            }
        } 
    }

}