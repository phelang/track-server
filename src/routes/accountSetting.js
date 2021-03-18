const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')

const router = express.Router()
router.use(requireAuth)

router.post('/deleteaccount', async (req, res) => {
  const user = req.user
  try {
    const deleteUser = await User.findByIdAndDelete(user._id)
    if (!deleteUser) res.status(401).send({ error: 'Could not delete user.' })
    return res.status(200).json({ message: 'User removed.' })
  } catch (e) {
    return res.status(401).send({ message: 'Internal server error.' })
  }
})

module.exports = router
