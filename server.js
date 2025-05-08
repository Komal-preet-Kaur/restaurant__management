const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 8080

const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')

// MongoDB connection string - replace <your_connection_string> with your actual MongoDB URI
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Reservation', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

main();

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

app.use(express.static(path.join(__dirname, 'public')));

// Define the routes for rendering views
app.get('/', (req, res) => {
  res.render('index', { showAuthLinks: true }); // Pass the showAuthLinks variable to index.ejs
});

app.get('/breakfast', (req, res) => {
  res.render('breakfast', { showAuthLinks: true }); // Pass showAuthLinks to breakfast.ejs
});

app.get('/appetiser', (req, res) => {
  res.render('appetiser', { showAuthLinks: true }); // Pass showAuthLinks to appetiser.ejs
});

app.get('/beverage', (req, res) => {
  res.render('beverage', { showAuthLinks: true }); // Pass showAuthLinks to beverage.ejs
});

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
