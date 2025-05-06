const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Reservation = require('../models/reservation')
const User = require('../models/User')

router.get('/', (req, res) => {
  res.render('home', {
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
    ],
    showAuthLinks : true
  })
})

// Sign-in route (GET)
router.get('/signin', (req, res) => {
  res.render('sign-in') 
})

// About us route
router.get('/about', (req, res) => {
  res.render('aboutus',{
    showAuthLinks : false
  })
})

// Contact us route
router.get('/contact', (req, res) => {
  res.render('contactus',{
    showAuthLinks : false
  })
})

// Privacy policy route
router.get('/privacy', (req, res) => {
  res.render('privacypolicy',{
    showAuthLinks : false
  })
})

// Explore route
router.get('/explore', (req, res) => {
  res.render('exploreRest',{
    showAuthLinks : false
  }) // Make sure 'exploreRest.ejs' exists
})

// Sign-in route (POST)
router.post('/signin', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(302).redirect('/signup')
    }
    const isMatch = await user.comparePassword(password)
    if (isMatch) {
      return res.status(302).redirect('/index')
    } else {
      return res.status(302).redirect('/signin')
    }
  } catch (err) {
    next(err)
  }
})

// Sign-up route (GET)
router.get('/signup', (req, res) => {
  res.render('signup') 
})

// Sign-up route (POST)
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      // User already exists, redirect to signup with error or handle accordingly
      return res.status(302).redirect('/signup')
    }
    const newUser = new User({ username, password })
    await newUser.save()
    res.redirect('/signin')
  } catch (err) {
    next(err)
  }
})
// Index route
router.get('/index', (req, res) => {
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
    ],
    showAuthLinks : false,
  })
})

// Reservation page route (GET)
router.get('/reserve/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  res.render('reservation', { restaurantId });
});

// Reservation form submission (POST)
router.post('/reserve/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const { name, email, phone, date, time, guests, special_requests } = req.body;

  try {
    const newReservation = new Reservation({
      restaurantId,
      name,
      email,
      phone,
      date,
      time,
      guests,
      special_requests
    });

    await newReservation.save();
    res.send(`<h2>Thank you, your reservation is confirmed!</h2><a href="/">Back to Home</a>`);
  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).send('Failed to reserve. Please try again.');
  }
});
// Add this above module.exports

// Hardcoded restaurant data for search API
const restaurants = [
  {
    id: 1,
    name: 'Urban Cafe',
    address: 'Hyatt Regency, Sector 35, Chandigarh',
    cuisine: 'Chinese, Indian',
    lat: 30.7333,
    lng: 76.7794
  },
  {
    id: 2,
    name: 'Piccante',
    address: 'Sector 26, Chandigarh',
    cuisine: 'Italian, Chinese',
    lat: 30.7415,
    lng: 76.7680
  },
  {
    id: 3,
    name: 'The Cafe @ JW',
    address: 'JW Marriott Hotel, Sector 35, Chandigarh',
    cuisine: 'Indian, Cafe, International',
    lat: 30.7339,
    lng: 76.7790
  },
  {
    id: 4,
    name: 'Baluchi',
    address: 'Sector 26, Chandigarh',
    cuisine: 'Indian, Asian',
    lat: 30.7410,
    lng: 76.7675
  },
  {
    id: 5,
    name: 'Virgin Courtyard',
    address: 'Sector 7, Chandigarh',
    cuisine: 'Italian',
    lat: 30.7350,
    lng: 76.7800
  },
  {
    id: 6,
    name: 'Tamra',
    address: 'Sector 7, Chandigarh',
    cuisine: 'Multicuisine',
    lat: 30.7355,
    lng: 76.7805
  }
];

// API route for restaurant search
router.get('/api/restaurants/search', (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : '';
  if (!query) {
    return res.json({ results: [] });
  }
  const results = restaurants.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.address.toLowerCase().includes(query) ||
    r.cuisine.toLowerCase().includes(query)
  );
  res.json({ results });
});

module.exports = router
