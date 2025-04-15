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


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())


app.use(express.static(path.join(__dirname, 'public')))


// Home route
app.get('/', (req, res) => {
  res.render('home')
})

// Index route
app.get('/index', (req, res) => {
  res.render('index', {
    title: 'DineDelight',
    heading: 'Where every flavor tells a story',
    subheading: 'Come with family & feel the joy of mouthwatering food',
    steps: [
      {
        title: 'Register',
        image: '/images/step1image.avif',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      },
      {
        title: 'Explore Restaurants',
        image: '/images/step2image.avif',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      },
      {
        title: 'Book Table',
        image: '/images/step3image.avif',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      }
    ]
  })
})

// Explore route
app.get('/explore', (req, res) => {
  res.render('exploreRest') // rename exploreRest.html to exploreRest.ejs
})

// Sign-in route
app.get('/signin', (req, res) => {
  res.render('sign-in')
})

// Sign-up route
app.get('/signup', (req, res) => {
  res.render('signup')
})

// About us route
app.get('/about', (req, res) => {
  res.render('aboutus')
})

// Contact us route
app.get('/contact', (req, res) => {
  res.render('contactus')
})

// Privacy policy route
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

// Error handler middleware
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
