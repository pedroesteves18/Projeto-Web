var usuarios = []
var admin = []
var id = 0

module.exports = {
    novoUsuario: function(usuario,senha,idade,nome,cidade){
        if(usuario,senha,idade,nome,cidade === null){
            return null
        } else {
            usuario = [usuario,senha,idade,nome,cidade]
            usuarios.push(usuario)
            return usuario
        }
    },
    novoAdmin: function(usuario,senha){
        novoAdm = [usuario,senha]
        admin.push[novoAdm]
        return novoAdm
    }
}