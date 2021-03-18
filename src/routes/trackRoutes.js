const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router()

router.use(requireAuth)

router.get('/tracks', async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id })

  res.send(tracks)
})

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' })
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id })
    await track.save()
    res.send(track)
  } catch (err) {
    res.send(422).send({ err: err.message })
  }
})

router.post('/tracks/delete', async (req, res) => {
  const { track_id } = req.body

  Track.deleteOne({ _id: track_id }, function (err, results) {
    if (err) {
      res.status(401).send({ err: 'Internal server error' })
    }
    res.status(200).send({ results: results })
  })
})

module.exports = router
