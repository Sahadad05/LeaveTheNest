const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const duenioSchema = new Schema({
  username: String,
  email: String,
  photoURL: String,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

// jajaja justo hice uno, borraré el mio
  module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))