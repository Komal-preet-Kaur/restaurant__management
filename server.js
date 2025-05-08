const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const apiRoutes = require('./api/apiRoutes');

const app = express();
const PORT = 8080;

// MongoDB connection
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Reservation', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}
main();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with environment variable in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use true if using HTTPS
}));

// Attach username globally to all views
app.use((req, res, next) => {
  res.locals.username = req.session?.user?.username || null;
  next();
});

// Custom logger middleware
app.use(logger);

// Static view routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/breakfast', (req, res) => {
  res.render('breakfast');
});

app.get('/appetiser', (req, res) => {
  res.render('appetiser');
});

app.get('/beverage', (req, res) => {
  res.render('beverage');
});

// API routes
app.use('/', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page Not Found' });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
