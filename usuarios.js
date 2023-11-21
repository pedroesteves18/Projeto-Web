var usuarios = []
var admin = []

module.exports = {
    novoUsuario: function(usuario, senha, idade, nome, cidade) {
        if (usuario && senha && idade && nome && cidade) {
            const novoUsuario = {
                usuario: usuario,
                senha: senha,
                idade: idade,
                nome: nome,
                cidade: cidade,
                roles: "user"
            };
            usuarios.push(novoUsuario);
            return novoUsuario;
        } else {
            return null;
        }
    },
    novoAdmin: function(usuario, senha) {
        const novoAdm = {
            usuario: usuario,
            senha: senha,
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
    }

}