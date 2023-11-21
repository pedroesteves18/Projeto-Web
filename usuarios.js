var usuarios = []
var admin = []

module.exports = {
    novoUsuario: function(usuario,senha,idade,nome,cidade){
        if(usuario === undefined || senha === undefined || idade === undefined || nome === undefined || cidade === undefined){
            return null
        } else {
            const NovoUsuario = [usuario,senha,idade,nome,cidade]
            usuarios.push(NovoUsuario)
            return NovoUsuario
        }
    },
    novoAdmin: function(usuario,senha){
        novoAdm = [usuario,senha,"adm"]
        admin.push(novoAdm)
        console.log("adm criado")
        return novoAdm
    },
    getUsuario: function(usuario,senha){
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i][0] === usuario && usuarios[i][1] === senha) {
                return usuarios[i]
            }
        }
        return null
    },
    getADM: function(usuario,senha){
        for (var i = 0; i < usuarios.length; i++) {
            if (admin[i][0] === usuario && admin[i][1] === senha) {
                return admin[i]
            }
        }
        return null
    }

}