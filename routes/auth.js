const router      = require('express').Router()
const User        = require('../models/User')
const passport    = require('../helpers/passport')
const uploadCloud = require('../helpers/cloudinary')
const sendMail    = require('../helpers/mailer')


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
  User.findById(req.app.locals.loggedUser._id).populate('descripciones')
  .then(usuario => {
    console.log(usuario)
    res.render('profile', usuario) //Lo que le tengo que pasar aquí es un objeto
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
    photoURL: req.app.locals.loggedUser.photoURL
  }
  res.render('auth/signup', configuration)
})

router.post('/edit/:id', (req, res, next) => {
  let {id} = req.params
  User.findByIdAndUpdate(id, req.body, {new: true})
  .then(user => {
    req.app.locals.loggedUser = user
    res.redirect('/profile')
  })
  .catch(e => next(e))
})

router.get('/edit_image', isLogged, (req, res) => {
  res.render('edit_image')
})

router.post('/edit_image', isLogged, uploadCloud.single('photoURL'), (req, res, next) => {
  User.findByIdAndUpdate(req.app.locals.loggedUser._id, { photoURL: req.file.url }, { new: true })
  .then(user => {
    req.app.locals.loggedUser = user
    console.log(user)
    res.redirect('/profile')
  })
  .catch(e => next(e))
})

//Facebook
// router.get('/facebook', passport.authenticate("facebook"))

// router.get('/facebook/callback',passport.authenticate("facebook"), (req,res,next)=>{
//   if(req.user.active ===  false) return res.redirect('/complete_profile')
//   return res.redirect('/profile')
// })

// router.post('/complete_profile', (req, res, next) => {
//   User.findOneAndUpdate({username: req.user.username}, {...req.body,  active: true})
// }) 

// router.post('/facebook', (req,res,next)=>{
// User.registrer(req.body, req.body.password)
//   .then(user => {
//     res.redirect('/profile')
//   })
//   .catch(e => console.log(e))
// })


module.exports = router