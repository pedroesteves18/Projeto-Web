

var express = require('express')
var router = express.Router()
router.use(express.json());
const banco = require('../banco/db');
const album = require('../banco/album')
const banda = require('../banco/banda')
const musica = require('../banco/musica')
const Usuarios = require('../functions/funcoesUsers')
router.get('/', async (req,res)=> {
    // #swagger.summary = 'instala banco de dados'
    const adm = await Usuarios.novoAdmin("adm1","senha1",1,"ADM","cidade1")
    try{
        banda.create({
            nome: "Sarcofago",
            paisOrigem: "Brasil"
          }).then((Sarcofago) => {
            album.create({
              titulo: 'I.N.R.I.',
              anoLancamento: 1987,
              genero: 'Black Metal',
              BandaId: Sarcofago.id
            }).then((INRI) => {
              musica.create({
                nome: "Satanic Lust",
                duracao: 188,
                AlbumId: INRI.id 
              });
              musica.create({
                nome: "Nightmare",
                duracao: 338,
                AlbumId: INRI.id
              });
            });
            album.create({
              titulo: 'Hate',
              anoLancamento: 1994,
              genero: 'Death Metal',
              BandaId: Sarcofago.id
            }).then((Hate) => {
              musica.create({
                nome: "Hate",
                duracao: 145,
                AlbumId: Hate.id
              });
            });
        });
        banda.create({
            nome: "Mayhem",
            paisOrigem: "Noruega"
        }).then((Mayhem) => {
                album.create({
                    titulo: 'Deathcrush',
                    anoLancamento: 1987,
                    genero: 'Death Metal',
                    BandaId: Mayhem.id
                }).then((Deathcrush) => {
                    musica.create({
                        nome: "Chainsaw Gutsfuck",
                        duracao: 212,
                        AlbumId: Deathcrush.id
                    })
                    musica.create({
                        nome: "Necrolust",
                        duracao: 217,
                        AlbumId: Deathcrush.id
                    })
                })
                album.create({
                    titulo: 'De Mysteriis Dom Sathanas',
                    anoLancamento: 1994,
                    genero: 'Black Metal',
                    BandaId: Mayhem.id
                }).then((Dmds) =>{
                    musica.create({
                        nome: "Funeral Fog",
                        duracao: 347,
                        AlbumId: Dmds.id
                    })
                    musica.create({
                        nome: "Freezing Moon",
                        duracao: 383,
                        AlbumId: Dmds.id
                    })
                    musica.create({
                        nome: "De Mysteriis Dom Sathanas",
                        duracao: 381,
                        AlbumId: Dmds.id
                    })
                })            
        })
        banda.create({
            nome: "Cannibal Corpse",
            paisOrigem: "Estados Unidos"
        }).then((Cannibal) =>{
            album.create({
                titulo: 'Violence Unimagined',
                anoLancamento: 2021,
                BandaId: Cannibal.id,
                genero: 'Death Metal'
            }).then((Violence) => {
                musica.create({
                    nome: "Inhumane Harvest",
                    duracao: 272,
                    AlbumId: Violence.id
                })
                musica.create({
                    nome: "Sorround, Kill, Devour",
                    duracao: 250,
                    AlbumId: Violence.id
                })
        
                musica.create({
                    nome: "Follow the Blood",
                    duracao: 279,
                    AlbumId: Violence.id
                })
            })
            album.create({
                titulo: 'Evisceration Plague',
                anoLancamento: 2004,
                BandaId: Cannibal.id,
                genero: 'Death Metal'
            }).then((Plague) => {  
                musica.create({
                    nome: "Shatter Their Bones",
                    duracao: 155,
                    AlbumId: Plague.id
                })
            })
            album.create({
                titulo: 'Tomb of the Mutilated',
                anoLancamento: 1992,
                BandaId: Cannibal.id,
                genero: 'Death Metal'
            }).then((Tomb) =>{
                musica.create({
                    nome: "Beyond the Cemetery",
                    duracao: 157,
                    AlbumId: Tomb.id
                })
        
                musica.create({
                    nome: "Hammer Smashed Face",
                    duracao: 279,
                    AlbumId: Tomb.id
                })
            })
        })
        banda.create({
            nome: "Darkthrone",
            paisOrigem: "Noruega"
        }).then((Darkthrone) => {
            album.create({
                titulo: 'Transilvanian Hunger',
                anoLancamento: 1994,
                BandaId: Darkthrone.id,
                genero: 'Black Metal'
            }).then((Hunger) => {
                musica.create({
                    nome: "Transilvanian Hunger",
                    duracao: 309,
                    AlbumId: Hunger.id
                })
        
                musica.create({
                    nome: "Slottet I Det Fjerne",
                    duracao: 285,
                    AlbumId: Hunger.id
                })
        
            })

        })
        banda.create({
            nome: "Metallica",
            paisOrigem: "Estados Unidos"
        }).then((Metallica) => {
            album.create({
                titulo: 'Black Album',
                anoLancamento: 1991,
                BandaId: Metallica.id,
                genero: 'Thrash Metal'
            }).then((Black) => {
                musica.create({
                    nome: "Enter Sandman",
                    duracao: 331,
                    AlbumId: Black.id
                })
        
                musica.create({
                    nome: "Don't Tread on Me ",
                    duracao: 240,
                    AlbumId: Black.id
                })
            })
            album.create({
                titulo: 'Master of Puppets',
                anoLancamento: 1986,
                BandaId: Metallica.id,
                genero: 'Thrash Metal'
            }).then((Master) => {
                musica.create({
                    nome: "Master of Puppets",
                    duracao: 515,
                    AlbumId: Master.id
                })
            })
            album.create({
                titulo: 'Ride the Lightning',
                anoLancamento: 1984,
                BandaId: Metallica.id,
                genero: 'Thrash Metal'
            }).then((Ride) => {
                
                musica.create({
                    nome: "For Whom the Bell Tolls",
                    duracao: 309,
                    AlbumId: Ride.id
                })

                musica.create({
                    nome: "Crepping Death",
                    duracao: 395,
                    AlbumId: Ride.id
                })
            })
            album.create({
                titulo: '72 Seasons',
                anoLancamento: 2023,
                BandaId: Metallica.id,
                genero: 'Thrash Metal'
            }).then((Seasons) => {
                musica.create({
                    nome: "Inamorata",
                    duracao: 670,
                    AlbumId: Seasons.id
                })
            })
        })
        banda.create({
            nome: "Gojira",
            paisOrigem: "França"
        }).then((Gojira) => {
            album.create({
                titulo: 'From Mars to Sirius',
                anoLancamento: 2005,
                BandaId: Gojira.id,
                genero: 'Death Metal'
            }).then((Mars) =>{
                musica.create({
                    nome: "Flying Whales",
                    duracao: 464,
                    AlbumId: Mars.id
                })
                musica.create({
                    nome: "The Heaviest Matter of the Universe",
                    duracao: 237,
                    AlbumId: Mars.id
                })
            })
            album.create({
                titulo: 'Magma',
                anoLancamento: 2016,
                BandaId: Gojira.id,
                genero: 'Death Metal'
            }).then((Magma) =>{
                musica.create({
                    nome: "Silvera",
                    duracao: 152,
                    AlbumId: Magma.id
                })
            })
        })
        banda.create({
            nome: "Megadeth",
            paisOrigem: "Estados Unidos"
        }).then((Megadeth) => {
            album.create({
                titulo: 'Peace Sells... but Whos Buying?',
                anoLancamento: 1986,
                BandaId: Megadeth.id,
                genero: 'Thrash Metal'
            }).then((Peace) =>{
                
                musica.create({
                    nome: "Peace Sells",
                    duracao: 242,
                    AlbumId: Peace.id
                })

                musica.create({
                    nome: "Wake Up Dead",
                    duracao: 217,
                    AlbumId: Peace.id
                })
            })
            album.create({
                titulo: 'Rust in peace',
                anoLancamento: 1990,
                BandaId: Megadeth.id,
                genero: 'Thrash Metal'
            }).then((Rust) =>{
                musica.create({

                    nome: "Tornado Of Souls",
                    duracao: 322,
                    AlbumId: Rust.id
                })
        
                musica.create({
                    nome: "Holy Wars...The Punishment Due",
                    duracao: 396,
                    AlbumId: Rust.id
                })
            })
            album.create({
                titulo: 'Youthanasia',
                anoLancamento: 1994,
                BandaId: Megadeth.id,
                genero: 'Thrash Metal'
            }).then((Youthanasia) =>{

                musica.create({
                    nome: "A Tout Le Monde",
                    duracao: 267,
                    AlbumId: Youthanasia.id
                })
            })
        })
        banda.create({
            nome: "Bathory",
            paisOrigem: "Suécia"
        }).then((Bathory) => {

            album.create({
                titulo: 'Blood Fire Death',
                anoLancamento: 1988,
                BandaId: Bathory.id,
                genero: 'Black Metal'
            }).then((Blood) => {
                musica.create({
                    nome: "A Fine Day to Die",
                    duracao: 516,
                    AlbumId: Blood.id
        })
            })
            album.create({
                titulo: 'In Memory of Quorthon',
                anoLancamento: 2006,
                BandaId: Bathory.id,
                genero: 'Black Metal'
            }).then((Memory) => {
                musica.create({
                    nome: "Pace Till Death",
                    duracao: 160,
                    AlbumId: Memory.id
                })
        
                musica.create({
                    nome: "Call from the Grave",
                    duracao: 292,
                    AlbumId: Memory.id
                })
            })
            album.create({
                titulo: 'Bathory',
                anoLancamento: 1984,
                BandaId: Bathory.id,
                genero: 'Black Metal'
            }).then((Bathory) => {

                musica.create({
                    nome: "Hades",
                    duracao: 170,
                    AlbumId: Bathory.id
                })
        
                musica.create({
                    nome: "Necromancy",
                    duracao: 219,
                    AlbumId: Bathory.id
                }) 
            })
        })
        banda.create({
            nome: "Black Sabbath",
            paisOrigem: "Inglaterra"
        }).then((Black) => {
            
            album.create({
                titulo: 'Paranoid',
                anoLancamento: 1970,
                BandaId: Black.id,
                genero: 'Heavy Metal'
            }).then((Paranoid) => {

                musica.create({
                    nome: "War Pigs",
                    duracao: 477,
                    AlbumId: Paranoid.id
                })
                                
                musica.create({
                    nome: "Eletric Funeral",
                    duracao: 288,
                    AlbumId: Paranoid.id
                })
            })
            album.create({
                titulo: 'Master of Reality',
                anoLancamento: 1971,
                BandaId: Black.id,
                genero: 'Heavy Metal'
            }).then((Master) => {

                musica.create({
                    nome: "Sweet Leaf",
                    duracao: 302,
                    AlbumId: Master.id
                })
            })
            album.create({
                titulo: 'Heaven and Hell',
                anoLancamento: 1980,
                BandaId: Black.id,
                genero: 'Heavy Metal'
            }).then((Heaven) => {

                musica.create({
                    nome: "Heaven and Hell",
                    duracao: 417,
                    AlbumId: Heaven.id
                })
            })
            album.create({
                titulo: 'Sabbath Bloody Sabbath',
                anoLancamento: 1973,
                BandaId: Black.id,
                genero: 'Heavy Metal'
            }).then((Sabbath) => {
                    
                musica.create({
                    nome: "Sabbra Cadabra",
                    duracao: 355,
                    AlbumId: Sabbath.id
                })

                musica.create({
                    nome: "Sabbath Bloody Sabbath",
                    duracao: 344,
                    AlbumId: Sabbath.id
                })
            })
        })
        banda.create({
            nome: "Sepultura",
            paisOrigem: "Brasil"
        }).then((Sepultura) =>{
            
            album.create({
                titulo: 'Roots',
                anoLancamento: 1996,
                BandaId: Sepultura.id,
                genero: 'Groove Metal'
            }).then((Roots) => {
                musica.create({
                    nome: "Ratamahatta",
                    duracao: 270,
                    AlbumId: Roots.id
                })
        
                musica.create({
                    nome: "Roots Bloody Roots",
                    duracao: 212,
                    AlbumId: Roots.id
                })
            })
            album.create({
                titulo: 'Chaos A.D.',
                anoLancamento: 1993,
                BandaId: Sepultura.id,
                genero: 'Groove Metal'
            }).then((Chaos) => {
                musica.create({
                    nome: "Territory",
                    duracao: 287,
                    AlbumId: Chaos.id
                })
            })
        })
        banda.create({
            nome: "Burzum",
            paisOrigem: "Noruega"
        }).then((Burzum) => {

            album.create({
                titulo: 'Filosofem',
                anoLancamento: 1996,
                BandaId: Burzum.id,
                genero: 'Black Metal'
            }).then((Filosofem) => {

                musica.create({
                    nome: "Dunkelheit",
                    duracao: 425,
                    AlbumId: Filosofem.id
                })
        
                musica.create({
                    nome: "Jesus' Tod",
                    duracao: 519,
                    AlbumId: Filosofem.id
                })
            })
            album.create({
                titulo: 'Burzum',
                anoLancamento: 1992,
                BandaId: Burzum.id,
                genero: 'Black Metal'
            }).then((Burzum) => {
                musica.create({
                    nome: "War",
                    duracao: 150,
                    AlbumId: Burzum.id
                })
        
                musica.create({
                    nome: "Ea, Lord of Depths",
                    duracao: 292,
                    AlbumId: Burzum.id
                })
            })
        })
        banda.create({
            nome: "Slayer",
            paisOrigem: "Estados Unidos"
        }).then((Slayer) => {
            
            album.create({
                titulo: 'Reign in Blood',
                anoLancamento: 1986,
                BandaId: Slayer.id,
                genero: 'Thrash Metal'
            }).then((Blood) => {
                
                musica.create({
                    nome: "Angel of Death",
                    duracao: 299,
                    AlbumId: Blood.id
                })        
                musica.create({
                    nome: "Raining Blood",
                    duracao: 255,
                    AlbumId: Blood.id
                })
            })
            album.create({
                titulo: 'South of Heaven',
                anoLancamento: 1988,
                BandaId: Slayer.id,
                genero: 'Thrash Metal'
            }).then((South) => {
                    
                musica.create({
                    nome: "South of Heaven",
                    duracao: "298",
                    AlbumId: South.id
                })
            })
        })

        res.send({mensagem: "criado com sucesso"})
    }catch(error){
        res.status(400).send({erro: "erro ao instalar o banco de dados"})
    }
})



module.exports = router;
