const express = require('express');
const router  = express.Router();
const User    = require('../models/User')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/create', (req, res, next) => {
  User.create(req.body).then(user => console.log(user)).catch(error => console.log(error))
})

router.post('/')


module.exports = router;
