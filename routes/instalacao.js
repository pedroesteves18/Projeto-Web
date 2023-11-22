var express = require('express')
var router = express.Router()
router.use(express.json());
const banco = require('../banco/db');
const musica = require('../banco/musica')
const album = require('../banco/album')
const banda = require('../banco/banda')

router.get('/', async (req,res)=> {
    try{
        banda.create({
            nome: "Sarcofago",
            paisOrigem: "Brasil"
        })
        banda.create({
            nome: "Mayhem",
            paisOrigem: "Noruega"
        })
        banda.create({
            nome: "Cannibal Corpse",
            paisOrigem: "Estados Unidos"
        })
        banda.create({
            nome: "Darkthrone",
            paisOrigem: "Noruega"
        })
        banda.create({
            nome: "Metallica",
            paisOrigem: "Estados Unidos"
        })
        banda.create({
            nome: "Gojira",
            paisOrigem: "França"
        })
        banda.create({
            nome: "Megadeth",
            paisOrigem: "Estados Unidos"
        })
        banda.create({
            nome: "Bathory",
            paisOrigem: "Suécia"
        })
        banda.create({
            nome: "Black Sabbath",
            paisOrigem: "Inglaterra"
        })
        banda.create({
            nome: "Sepultura",
            paisOrigem: "Brasil"
        })
        banda.create({
            nome: "Burzum",
            paisOrigem: "Noruega"
        })
        banda.create({
            nome: "Slayer",
            paisOrigem: "Estados Unidos"
        })
        album.create({
            titulo: 'Deathcrush',
            anoLancamento: 1987,
            BandaId: 1,
            genero: 'Death Metal'
        })
        album.create({
            titulo: 'De Mysteriis Dom Sathanas',
            anoLancamento: 1994,
            BandaId: 1,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'I.N.R.I.',
            anoLancamento: 1987,
            BandaId: 2,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'Hate',
            anoLancamento: 1994,
            BandaId: 2,
            genero: 'Death Metal'
        })
        album.create({
            titulo: 'Violence Unimagined',
            anoLancamento: 2021,
            BandaId: 3,
            genero: 'Death Metal'
        })
        album.create({
            titulo: 'Evisceration Plague',
            anoLancamento: 2004,
            BandaId: 3,
            genero: 'Death Metal'
        })
        album.create({
            titulo: 'Tomb of the Mutilated',
            anoLancamento: 1992,
            BandaId: 3,
            genero: 'Death Metal'
        })
        album.create({
            titulo: 'Transilvanian Hunger',
            anoLancamento: 1994,
            BandaId: 4,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'Peace Sells... but Whos Buying?',
            anoLancamento: 1986,
            BandaId: 5,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: 'Rust in peace',
            anoLancamento: 1990,
            BandaId: 5,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: 'Youthanasia',
            anoLancamento: 1994,
            BandaId: 5,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: 'Black Album',
            anoLancamento: 1991,
            BandaId: 6,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: 'Master of Puppets',
            anoLancamento: 1986,
            BandaId: 6,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: 'Ride the Lightning',
            anoLancamento: 1984,
            BandaId: 6,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: '72 Seasons',
            anoLancamento: 2023,
            BandaId: 6,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: 'From Mars to Sirius',
            anoLancamento: 2005,
            BandaId: 7,
            genero: 'Death Metal'
        })
        album.create({
            titulo: 'Magma',
            anoLancamento: 2016,
            BandaId: 7,
            genero: 'Death Metal'
        })
        album.create({
            titulo: 'Paranoid',
            anoLancamento: 1970,
            BandaId: 8,
            genero: 'Heavy Metal'
        })
        album.create({
            titulo: 'Master of Reality',
            anoLancamento: 1971,
            BandaId: 8,
            genero: 'Heavy Metal'
        })
        album.create({
            titulo: 'Heaven and Hell',
            anoLancamento: 1980,
            BandaId: 8,
            genero: 'Heavy Metal'
        })
        album.create({
            titulo: 'Sabbath Bloody Sabbath',
            anoLancamento: 1973,
            BandaId: 8,
            genero: 'Heavy Metal'
        })
        album.create({
            titulo: 'Roots',
            anoLancamento: 1996,
            BandaId: 9,
            genero: 'Groove Metal'
        })
        album.create({
            titulo: 'Chaos A.D.',
            anoLancamento: 1993,
            BandaId: 9,
            genero: 'Groove Metal'
        })
        album.create({
            titulo: 'Blood Fire Death',
            anoLancamento: 1988,
            BandaId: 10,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'In Memory of Quorthon',
            anoLancamento: 2006,
            BandaId: 10,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'Bathory',
            anoLancamento: 1984,
            BandaId: 10,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'Filosofem',
            anoLancamento: 1996,
            BandaId: 11,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'Burzum',
            anoLancamento: 1992,
            BandaId: 11,
            genero: 'Black Metal'
        })
        album.create({
            titulo: 'Reign in Blood',
            anoLancamento: 1986,
            BandaId: 12,
            genero: 'Thrash Metal'
        })
        album.create({
            titulo: 'South of Heaven',
            anoLancamento: 1988,
            BandaId: 12,
            genero: 'Thrash Metal'
        })

        musica.create({
            nome: "Satanic Lust",
            duracao: 188,
            AlbumId: 1
        })
        musica.create({
            nome: "Nightmare",
            duracao: 338,
            AlbumId: 1
        })
        musica.create({
            nome: "Hate",
            duracao: 145,
            AlbumId: 2
        })

        musica.create({
            nome: "Funeral Fog",
            duracao: 347,
            AlbumId: 3
        })
        musica.create({
            nome: "Freezing Moon",
            duracao: 383,
            AlbumId: 3
        })
        musica.create({
            nome: "De Mysteriis Dom Sathanas",
            duracao: 381,
            AlbumId: 3
        })

        musica.create({
            nome: "Chainsaw Gutsfuck",
            duracao: 212,
            AlbumId: 4
        })
        musica.create({
            nome: "Necrolust",
            duracao: 217,
            AlbumId: 4
        })

        musica.create({
            nome: "Inhumane Harvest",
            duracao: 272,
            AlbumId: 5
        })
        musica.create({
            nome: "Sorround, Kill, Devour",
            duracao: 250,
            AlbumId: 5
        })

        musica.create({
            nome: "Follow the Blood",
            duracao: 279,
            AlbumId: 5
        })

        musica.create({
            nome: "Shatter Their Bones",
            duracao: 155,
            AlbumId: 6
        })

        musica.create({
            nome: "Beyond the Cemetery",
            duracao: 157,
            AlbumId: 7
        })

        musica.create({
            nome: "I Cum Blood",
            duracao: 279,
            AlbumId: 7
        })

        musica.create({
            nome: "Transilvanian Hunger",
            duracao: 309,
            AlbumId: 8
        })

        musica.create({
            nome: "Slottet I Det Fjerne",
            duracao: 285,
            AlbumId: 8
        })

        musica.create({
            nome: "Peace Sells",
            duracao: 242,
            AlbumId: 9
        })

        musica.create({
            nome: "Wake Up Dead",
            duracao: 217,
            AlbumId: 9
        })

        musica.create({
            nome: "Tornado Of Souls",
            duracao: 322,
            AlbumId: 10
        })

        musica.create({
            nome: "Holy Wars...The Punishment Due",
            duracao: 396,
            AlbumId: 10
        })

        musica.create({
            nome: "A Tout Le Monde",
            duracao: 267,
            AlbumId: 11
        })

        musica.create({
            nome: "Enter Sandman",
            duracao: 331,
            AlbumId: 12
        })

        musica.create({
            nome: "Don't Tread on Me ",
            duracao: 240,
            AlbumId: 12
        })

        musica.create({
            nome: "Master of Puppets",
            duracao: 515,
            AlbumId: 13
        })

        musica.create({
            nome: "For Whom the Bell Tolls",
            duracao: 309,
            AlbumId: 14
        })

        musica.create({
            nome: "Crepping Death",
            duracao: 395,
            AlbumId: 14
        })

        musica.create({
            nome: "Inamorata",
            duracao: 670,
            AlbumId: 15
        })

        musica.create({
            nome: "Flying Whales",
            duracao: 464,
            AlbumId: 16
        })
        musica.create({
            nome: "The Heaviest Matter of the Universe",
            duracao: 237,
            AlbumId: 16
        })

        musica.create({
            nome: "Silvera",
            duracao: 152,
            AlbumId: 17
        })
                
        musica.create({
            nome: "War Pigs",
            duracao: 477,
            AlbumId: 18
        })
                        
        musica.create({
            nome: "Eletric Funeral",
            duracao: 288,
            AlbumId: 18
        })
        
        musica.create({
            nome: "Sweet Leaf",
            duracao: 302,
            AlbumId: 19
        })

        musica.create({
            nome: "Heaven and Hell",
            duracao: 417,
            AlbumId: 20
        })
                
        musica.create({
            nome: "Sabbra Cadabra",
            duracao: 355,
            AlbumId: 21
        })

        musica.create({
            nome: "Sabbath Bloody Sabbath",
            duracao: 344,
            AlbumId: 21
        })
                
        musica.create({
            nome: "Ratamahatta",
            duracao: 270,
            AlbumId: 22
        })

        musica.create({
            nome: "Roots Bloody Roots",
            duracao: 212,
            AlbumId: 22
        })

        musica.create({
            nome: "Territory",
            duracao: 287,
            AlbumId: 23
        })

        musica.create({
            nome: "A Fine Day to Die",
            duracao: 516,
            AlbumId: 24
        })
        musica.create({
            nome: "Pace Till Death",
            duracao: 160,
            AlbumId: 24
        })

        musica.create({
            nome: "Call from the Grave",
            duracao: 292,
            AlbumId: 25
        })
        
        musica.create({
            nome: "Hades",
            duracao: 170,
            AlbumId: 26
        })

        musica.create({
            nome: "Necromancy",
            duracao: 219,
            AlbumId: 26
        }) 

        musica.create({
            nome: "Dunkelheit",
            duracao: 425,
            AlbumId: 27
        })

        musica.create({
            nome: "Jesus' Tod",
            duracao: 519,
            AlbumId: 27
        })
        musica.create({
            nome: "War",
            duracao: 150,
            AlbumId: 28
        })

        musica.create({
            nome: "Ea, Lord of Depths",
            duracao: 292,
            AlbumId: 28
        })
        
        musica.create({
            nome: "Angel of Death",
            duracao: 299,
            AlbumId: 29
        })        
        musica.create({
            nome: "Raining Blood",
            duracao: 255,
            AlbumId: 29
        })        
        musica.create({
            nome: "South of Heaven",
            duracao: "298",
            AlbumId: 30
        })
        

        


        res.send({mensagem: "criado com sucesso"})
    }catch(error){
        res.status(400).send({erro: error})
    }
})



module.exports = router;