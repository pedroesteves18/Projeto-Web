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

        


        res.send({mensagem: "criado com sucesso"})
    }catch(error){
        res.status(400).send({erro: error})
    }
})



module.exports = router;