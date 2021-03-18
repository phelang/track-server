const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  // authorization === 'Bearer token4989849395834'

  if (!authorization)
    return res.status(401).send({ error: 'You must be logged in' })

  const token = authorization.replace('Bearer ', '')

  jwt.verify(token, 'MY_SECRETE_KEY', async (err, payload) => {
    if (err) return res.status(401).send({ error: 'Login unsuccessful' })

    try {
      const { userId } = payload
      const user = await User.findById(userId)
      if (!user) return res.status(401).json({ message: 'Unauthorized.' })
      req.user = user
      return next()
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' })
    }
  })
}
