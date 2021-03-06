const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pageRoutes = require('./routes/page-routes')
const actionRoutes = require('./routes/action-routes')
const logger = require('winston')

require('../config/winston-config')()

require('dotenv').config()

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))

mongoose.Promise = global.Promise
// connect to our database - DB_CONNECTION_STRING defined in .env file
mongoose.connect(process.env.DB_CONNECTION_STRING)

// configure body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/pages', pageRoutes)
app.use('/actions', actionRoutes)
app.get('/', (req, res) => {
    res.redirect('/pages/topics')
})
app.set('port', process.env.PORT || 3000)

logger.level = process.env.LOGGER_LEVEL
const server = app.listen(app.get('port'), () => {
    logger.info(`Express server listening on port ${server.address().port}`)
})
