const cors = require('cors')
const express = require('express')
const bp = require('body-parser')
const { connect } = require('mongoose')
const { success, error } = require('consola')

const { DB, PORT } = require('./config/index')

// Initialize app
const app = express();

// Middleware
app.use(bp.json())
app.use(cors())

// Use router
app.use('/api/users', require('./routes/users'))
app.use('/api/oauth', require('./routes/oauth'))

const startApp = async () => {
  // Connect to DB
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true
    })
    success({ message: `Successfully connected to the DB, \n ${DB}`, badge: true })

    // Listen to PORT
    app.listen(PORT, () => success({ message: `Server started on PORT ${PORT}`, badge: true }))
  } catch (err) {
    error({ message: `Error connecting to the DB, \n ${err}`, badge: true })
    startApp()
  }
}

startApp()