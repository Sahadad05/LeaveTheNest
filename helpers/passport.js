const passport          = require('passport')
const User              = require('../models/User')
// const FacebookStrategy  = require('passport-facebook').Strategy

passport.use(User.createStrategy())

// //Facebook
// passport.use(new FacebookStrategy({
//   clientID: "1911931605550376",
//   clientSecret: "ba095544c62689adf6d33699ba0f26aa",
//   callbackURL: "http://localhost:3000/facebook/callback"
// }, (accessToken, refreshToken, profile, cb) => {
//   console.log(profile)
//   User.findOne({ username: profile.displayName })
//   .then(result => {
//     if (result == null) {
//       User.create({ username: profile.displayName }, function (err, user) {
//         if (err) { return cb(err) }
//         cb(null, user)
//       })
//     } else {
//       cb(null, result)
//     }
//   })
// }
// ))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

module.exports = passport