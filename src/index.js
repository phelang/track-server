require('./models/User')
require('./models/Track')
require('./models/Signup')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
const authAccountSettings = require('./routes/accountSetting')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)
app.use(authAccountSettings)

const mongoUri =
  'mongodb+srv://root:AY8tDEoA1ic9BHWA@track.it6jr.mongodb.net/track?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connection to mongo instance')
})

mongoose.connection.on('error', (error) => {
  console.log('Error connecting to mongo')
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email : ${req.user.email}`)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  )
})
