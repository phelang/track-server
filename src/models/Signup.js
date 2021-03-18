const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    default: '',
  },
})

mongoose.model('Singup', signupSchema)
