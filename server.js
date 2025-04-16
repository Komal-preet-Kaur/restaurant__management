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

// API Routes
const apiRoutes = require('./api/apiRoutes')
app.use('/', apiRoutes)

// 404 route
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' })
  next();
})

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
