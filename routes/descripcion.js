const router      = require('express').Router()
const Descripcion      = require('../models/Descripcion')
const User        = require('../models/User')
//const uploadCloud = require('../helpers/cloudinary')

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.redirect('/login')
}

router.get('/create_new', isLogged, (req, res) => {
  res.render('descripcion/create_new')
})

router.post('/create_new', (req, res, next) => {
  Descripcion.create({body:req.body.body,author: req.user._id})
  .then(descripcion => {
    console.log(descripcion)
    User.findByIdAndUpdate(req.user._id, { $push: { descripciones: descripcion._id } }, { new: true })
    .then(user => {
      console.log(user)
      req.app.locals.loggedUser = user
      res.redirect('/profile')
    })
  })
})

module.exports = router