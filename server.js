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

// Set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())

// Serve static files (like css, js, images) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes using EJS
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/index', (req, res) => {
  res.render('index')
})

app.get('/explore', (req, res) => {
  res.render('exploreRest') // rename your exploreRest.html to exploreRest.ejs
})

app.get('/signin', (req, res) => {
  res.render('sign-in')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/about', (req, res) => {
  res.render('aboutus')
})

app.get('/contact', (req, res) => {
  res.render('contactus')
})

app.get('/privacy', (req, res) => {
  res.render('privacypolicy')
})

// API Routes
const apiRoutes = require('./api/apiRoutes')
app.use('/api', apiRoutes)

// 404 route
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' })
  next()
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
