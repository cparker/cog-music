'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const csv = require('csvtojson')
const app = express()
const expressPort = process.env.PORT || 5000
const albumFile = process.env.ALBUM_FILE || 'albums.csv'
let albumData = []

function start() {
  loadAlbumData()
  initExpress()
}

function loadAlbumData() {
  csv()
    .fromFile(albumFile)
    .then(jsonObj => {
      // add ids
      albumData = jsonObj.map((a, index) => ({ ...a, id: index }))
    })
}

function initExpress() {
  app.use(express.static('.'))
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  registerRoutes()

  app.listen(expressPort, '0.0.0.0', () => {
    console.log(`express listening on ${expressPort}`)
  })
}

function handleGetAlbum(req, res, next) {
  let idInt
  try {
    idInt = parseInt(req.params.id)
    const foundAlbum = albumData.filter(al => al.id === idInt)
    if (foundAlbum.length > 0) {
      res.json(foundAlbum)
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

function handleInsertAlbum(req, res, next) {
  const { album, artist, genre, year } = req.body
  if (album && artist && genre && year) {
    const id = new Date().getTime()
    albumData.push(Object.assign({}, { album, artist, genre, year, id }))
    res.status(201).send({ inserted: { album, artist, genre, year, id } })
  } else {
    res.status(405).send({ message: 'invalid' })
  }
}

function handleUpdateAlbum(req, res, next) {
  let idInt
  try {
    idInt = parseInt(req.params.id)
    const albumUpdate = req.body
    let foundAlbum = albumData.filter(al => al.id === idInt)
    if (foundAlbum.length > 0) {
      albumData = albumData.map(al => {
        if (al.id === idInt) {
          return Object.assign({}, al, albumUpdate)
        } else {
          return al
        }
      })
      let updatedAlbum = albumData.filter(al => al.id === idInt)
      res.json(updatedAlbum)
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

function handleDelete(req, res, next) {
  let idInt
  try {
    idInt = parseInt(req.params.id)
    let foundAlbum = albumData.filter(al => al.id === idInt)
    if (foundAlbum.length > 0) {
      albumData = albumData.filter(al => al.id !== idInt)
      res.status(200).send({ deleted: foundAlbum })
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

function handleArtists(req, res, next) {
  const artists = albumData.reduce((acc, alb) => {
    if (!acc.find(a => a.artist === alb.artist)) {
      acc.push(alb.artist)
    }
    return acc
  }, [])
  res.json(artists)
}

function handleArtist(req, res, next) {
  const artistAlbums = albumData.filter(
    alb => alb.artist.toLowerCase() === req.params.artistName.toLowerCase()
  )
  res.json(artistAlbums)
}

function handleByGenre(req, res, next) {
  const genreTally = albumData.reduce((acc, { genre }) => {
    if (acc[genre] !== undefined) {
      acc[genre] += 1
    } else {
      acc[genre] = 1
    }
    return acc
  }, {})
  const tallySorted = Object.entries(genreTally)

  tallySorted.sort((left, right) => {
    const [, lTally] = left
    const [, rTally] = right
    return rTally - lTally
  })

  const tallyClean = tallySorted.map(([genre, count]) => {
    return { genre, count }
  })

  res.json(tallyClean)
}

function handleByYear(req, res, next) {
  const yearTally = albumData.reduce((acc, { year }) => {
    if (acc[year] !== undefined) {
      acc[year] += 1
    } else {
      acc[year] = 1
    }
    return acc
  }, {})

  const yearTallySorted = Object.entries(yearTally)
  yearTallySorted.sort((left, right) => {
    const [, lTally] = left
    const [, rTally] = right
    return rTally - lTally
  })

  const tallyClean = yearTallySorted.map(([year, count]) => {
    return { year, count }
  })
  res.json(tallyClean)
}

function registerRoutes() {
  app.get('/albums', (req, res, next) => {
    res.json(albumData)
  })

  app.get('/album/:id', handleGetAlbum)

  app.post('/createalbum', handleInsertAlbum)

  app.put('/updatealbum/:id', handleUpdateAlbum)

  app.delete('/delete/:id', handleDelete)

  app.get('/artists', handleArtists)

  app.get('/artist/:artistName', handleArtist)

  app.get('/byGenre', handleByGenre)

  app.get('/byYear', handleByYear)
}

start()
