const express = require('express') // Express for routing and middleware management
const path = require('path') // Path to handle file paths
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 8080
// Import middlewares
const logger = require('./middlewares/logger') // Import logger middleware
const errorHandler = require('./middlewares/errorHandler') // Import error handler middleware
// Middleware to handle JSON and URL-encoded data in POST requests
app.use(express.json()) // To parse JSON bodies
app.use(express.urlencoded({ extended: true })) // To parse URL-encoded data
// Use logger middleware for all incoming requests
app.use(logger) // Log each request

//Third party middlewares


// 1. CORS Middleware – Allows cross-origin requests
app.use(cors())

// 2. Helmet Middleware – Adds security headers
app.use(helmet())

// 3. Compression Middleware – Compresses HTTP responses for better performance
app.use(compression())

// 4. Morgan Middleware – Logs HTTP requests in the console
app.use(morgan('dev'))

// 5. Cookie-Parser Middleware – Parses cookies from incoming requests
app.use(cookieParser())


// Serve static files (HTML, CSS, JS) from the /public directory
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
// Import API routes from apiRoutes.js
const apiRoutes = require('./api/apiRoutes') // Import the API routes for login and register functionality
app.use('/api', apiRoutes) // Mount the API routes on /api path

// 404 Middleware (Handle Undefined Routes Properly)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' })
  next() // Ensure proper middleware chain execution
})


// Use error handler middleware for catching and handling errors
app.use(errorHandler) // Handle errors globally
// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})