const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const Singup = mongoose.model('Singup')

const router = express.Router()
router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = new User({ email, password })
    await user.save()
    util(email)

    const token = jwt.sign({ userId: user._id }, 'MY_SECRETE_KEY')
    res.status(200).send({ token: token })
  } catch (err) {
    return res.status(422).send(err.message)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' })
  }

  const user = await User.findOne({ email: email })

  if (!user) return res.status(404).send({ error: 'Email not found' })

  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, 'MY_SECRETE_KEY')
    res.status(200).send({ token: token })
  } catch (err) {
    return res.status(404).send({ error: 'Invalid password or email' })
  }
})

const util = async (email) => {
  try {
    const user = new Singup({ username: email })
    await user.save()
  } catch (err) {
    return res.status(422).send(err.message)
  }
}

module.exports = router
