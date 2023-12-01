const User = require('../banco/usuarios')
const Admin = require('../banco/admins')
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
                    cidade: cidade
                })
                return userCriado
            }
    },
    novoAdmin: async function(usuario, senha) {
        const admExiste = await Admin.findOne({
            where: {
                [Op.or]:[
                    {usuario: usuario},
                    {senha: senha},
                ]
            }
        })
        if (admExiste){
            return null
        } else {
            const adminCriado = Admin.create({
                usuario: usuario,
                senha: senha
            })
            return adminCriado
        }
    },
    getUsuario: async function(usuario, senha) {
        const user = await User.findOne({
            where: {
                    usuario: usuario,
                    senha: senha,
            }
        })
        if(user !== null){
            return user
        }  else {
            return null
        }
    },
    getADM: async function(usuario, senha) {
        const adm = await Admin.findOne({
            where: {
                    usuario: usuario,
                    senha: senha,
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
                cidade: cidade
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