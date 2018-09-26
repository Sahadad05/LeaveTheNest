const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const PLM      = require('passport-local-mongoose')

const userSchema = new Schema({
  username: String,
  email: String,
  photoURL: String,
  // descripciones: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Descripcion'
  // }],
  active: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, 
  versionKey: false //Opcional
})

module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))