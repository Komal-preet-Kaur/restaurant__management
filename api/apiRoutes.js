const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

// Home route
router.get('/', (req, res) => {
  res.render('home') // Render EJS template instead of sending an HTML file
})

// Sign-in route (GET)
router.get('/signin', (req, res) => {
  res.render('sign-in') // Render EJS template for the sign-in page
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

// Index route (GET)
router.get('/api/index', (req, res) => {
  res.render('index') // Render EJS template for the index page
})

module.exports = router
