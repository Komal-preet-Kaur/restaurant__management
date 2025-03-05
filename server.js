const express = require('express') // Express for routing and middleware management
const path = require('path') // Path to handle file paths
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
// Serve static files (HTML, CSS, JS) from the /public directory
app.use(express.static(path.join(__dirname, 'public')))
// Import API routes from apiRoutes.js
const apiRoutes = require('./api/apiRoutes') // Import the API routes for login and register functionality
app.use('/api', apiRoutes) // Mount the API routes on /api path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html')) // Serve the login page at root URL
})
app.get('/explore', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'exploreRest.html')) // Serve the login page at root URL
})
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html')) // Serve the login page at root URL
})
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'sign-in.html')) // Serve the login page at root URL
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html')) // Serve the login page at root URL
})

// Use error handler middleware for catching and handling errors
app.use(errorHandler) // Handle errors globally
// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})