const router      = require('express').Router()
const User        = require('../models/User')
const passport    = require('../helpers/passport')
const uploadCloud = require('../helpers/cloudinary')
const sendMail    = require('../helpers/mailer')
const Descripcion = require('../models/Descripcion')


const isLogged = (req, res, next) => {
  if (req.app.locals.loggedUser) next()
  else res.redirect('/login')
}


router.get('/signup', (req, res) => {
  configuration = {
    title: 'Sign Up',
    btnValue: 'Crear cuenta',
    url: '/signup',
    password: true,
    id: ''
  }
  res.render('auth/signup', configuration)
  
})

router.post('/signup', (req, res, next) => {
  User.register({...req.body, active: true}, req.body.password)
  .then(user => {
      sendMail.welcomeMail(user.username, user.email)
      req.app.locals.loggedUser = user

      res.redirect('/profile')
})
  .catch(e => next(e))
})

router.post('/signupfb', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    console.log(user.email, user.username)
    sendMail.welcomeMail(user.username, user.email)
    req.app.locals.loggedUser = user
    console.log('ya llegó aquí', req.app.locals.loggedUser)
    res.redirect('/profile')
  })
  .catch(e => next(e))
})

router.get('/login', (req, res) => {
  if (req.user) req.logOut()
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  req.app.locals.loggedUser = req.user;
  res.redirect('/profile')
})

router.get('/profile', isLogged, (req, res) => {
  User.findById(req.app.locals.loggedUser._id)
  .then(usuario => {
    console.log(usuario)
    res.render('profile', req.app.locals.loggedUser) 
  })
  .catch(error => console.log(error))
})

router.get('/edit/:id', isLogged, (req, res) => {
  configuration = {
    title: 'Edita Perfil',
    btnValue: 'Save changes',
    url: '/edit',
    username: req.app.locals.loggedUser.username,
    //email: req.app.locals.loggedUser.email,
    password: false,
    id:  req.app.locals.loggedUser._id,
    photoURL: req.app.locals.loggedUser.photoURL,
    descripcion: req.app.locals.loggedUser.descripcion
  }
  res.render('edit', configuration)
})

router.post('/edit/:id', isLogged, uploadCloud.single('photoURL'),(req, res, next) => {
  let {id} = req.params
  let photito = req.app.locals.loggedUser.photoURL
  if(req.file) photito = req.file.url 
  User.findByIdAndUpdate(id, { ...req.body, photoURL: photito }, {new: true})
  .then(user => {
    req.app.locals.loggedUser = user
    res.redirect('/profile')
  })
  .catch(e => next(e))
})

router.get('/buscar', (req, res) => {
  if (req.user) req.logOut()
  res.render('buscar')
})

router.post('/buscar', (req, res, next) => {
  req.app.locals.loggedUser = req.user;
  res.redirect('/buscar')
})

router.get('/rentar', (req, res) => {
  if (req.user) req.logOut()
  res.render('rentar')
})

router.post('/rentar', (req, res, next) => {
  req.app.locals.loggedUser = req.user;
  res.redirect('/rentar')
})

module.exports = router