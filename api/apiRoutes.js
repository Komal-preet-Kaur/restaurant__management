const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

// Home route (updated to render 'index' instead of 'home')
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
    showAuthLinks : false
  })
})


// Sign-in route (GET)
router.get('/signin', (req, res) => {
  res.render('sign-in',) // Render EJS template for the sign-in page
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
router.post('/signin', (req, res, next) => {
  const { username, password } = req.body
  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err)
    const users = JSON.parse(data)
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      // Redirecting to EJS page
      return res.status(302).redirect('/index') // Use '/index' route (without the .html extension)
    } else {
      return res.status(302).redirect('/signin') // Use '/signin' route (without the .html extension)
    }
  })
})

// Sign-up route (GET)
router.get('/signup', (req, res) => {
  res.render('signup') // Render EJS template for the signup page
})

// Sign-up route (POST)
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body
  const newUser = { username, password }
  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err)
    let users = []
    if (data) {
      users = JSON.parse(data)
    }
    users.push(newUser)
    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) return next(err)
      res.status(302).redirect('/signin') // Redirect to EJS sign-in page
    })
  })
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
    showAuthLinks : true,
  },)
})

module.exports = router
