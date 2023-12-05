const User = require('../banco/usuarios')
const { Op } = require('sequelize');

module.exports = {
    novoUsuario: async function(usuario, senha, idade, nome, cidade) {
            const usuarioExiste = await User.findOne({
                where: {
                    [Op.or]:[
                        {usuario: usuario},
                        {senha: senha},
                    ]
                }
                })
            if(usuarioExiste){
                return null
            } else {
                const userCriado = User.create({
                    nome: nome,
                    usuario: usuario,
                    senha: senha,
                    idade: idade,
                    cidade: cidade,
                    adm: false
                })
                return userCriado
            }
    },
    novoAdmin: async function(usuario, senha, idade, nome, cidade) {
        const usuarioExiste = await User.findOne({
            where: {
                [Op.or]:[
                    {usuario: usuario},
                    {senha: senha},
                ]
            }
            })
        if(usuarioExiste){
            return null
        } else {
            const userCriado = User.create({
                nome: nome,
                usuario: usuario,
                senha: senha,
                idade: idade,
                cidade: cidade,
                adm: true
            })
            return userCriado
        }
    },
    getUsuario: async function(usuario, senha) {
        const user = await User.findOne({
            where: {
                    usuario: usuario,
                    senha: senha,
                    adm: false
            }
        })
        if(user !== null){
            return user
        }  else {
            return null
        }
    },
    getADM: async function(usuario, senha) {
        const adm = await User.findOne({
            where: {
                    usuario: usuario,
                    senha: senha,
                    adm: true
            }
        })

        if(adm !== null){
            return adm
        }  else {
            return null
        }
    },
    excluiUser: async function(id){
        const excluido = await User.destroy({
            where: {
                id: id
            }
        })
        return excluido
    },
    listarUsers: async function(){
        const users = await User.findAll()
        return users
    },
    alterarUser: async function(id,usuario, senha, idade, nome, cidade){
        const alterado = await User.update(
            {
                usuario: usuario,
                senha: senha,
                idade: idade,
                nome: nome,
                cidade: cidade,
                adm: false
            },
            {
                where: {
                    id: id
                }
            }
        );
        return alterado
    }

}