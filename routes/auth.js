const router      = require('express').Router()
const User        = require('../models/User')
const passport    = require('../helpers/passport')
const uploadCloud = require('../helpers/cloudinary')
const sendMail    = require('../helpers/mailer')
const Descripcion = require('../models/Descripcion')
const Nidos       = require('../models/Nidos')



const isLogged = (req, res, next) => {
  if (req.app.locals.loggedUser) next()
  else res.redirect('/login')
}


router.get('/signup', (req, res) => {
  configuration = {
    title: 'Regístra tu perfil',
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

router.get('/',(req,res)=>{
 req.logOut()
  req.app.local.user=null
  res.redirect('/')
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
    descripcion: req.app.locals.loggedUser.descripcion,
    edad: req.app.locals.loggedUser.edad,
    genero: req.app.locals.loggedUser.genero
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
  Nidos.find()
  .then(nidos=>{
    console.log(nidos)
    res.render('buscar', {nidos})  
  })
})

router.post('/buscar', (req, res, next) => {
  req.app.locals.loggedUser = req.user;
  Nidos.create(req.body)
  .then(nidos=>{
  res.redirect('/nidos')
})
  .catch(e=>console.log(e))
})

//LISTA DE NIDOS


router.get('/rentar', (req, res) => {
  res.render('rentar')
})

router.post('/rentar',(req, res, next) => {
  console.log(req.body)
  Nidos.create(req.body)
  .then(nidos=>{
    console.log(nidos)
    res.redirect('/nidos')
  })
  .catch(e=>console.log(e))
 })

 router.get('/nidos', (req, res)=>{
  Nidos.find()
    .then(nidos=>{
      res.render('nidos', {nidos})
    }).catch(e=>{
      console.log(e)
    })
})
router.get('/datos', (req, res) => {
  res.render('datos')
})


module.exports = router