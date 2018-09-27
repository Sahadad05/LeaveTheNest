const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const PLM      = require('passport-local-mongoose')

const userSchema = new Schema({
  username: String,
  email: String,
  photoURL: String,
  descripcion: String,
  active: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, 
  versionKey: false
})

module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))