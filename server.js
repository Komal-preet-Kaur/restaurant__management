const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 8080

const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'))
})
app.get('/explore', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'exploreRest.html'))
})
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'sign-in.html'))
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'))
})
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'aboutus.html'))
})
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contactus.html'))
})
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'privacypolicy.html'))
})

app.use(express.static(path.join(__dirname, 'views')))

const apiRoutes = require('./api/apiRoutes')
app.use('/api', apiRoutes)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' })
  next()
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})