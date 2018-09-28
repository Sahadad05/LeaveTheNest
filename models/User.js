const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const PLM      = require('passport-local-mongoose')
const userSchema = new Schema({   
  username: String,
  email: String,
  photoURL: String,
  descripcion: String,
  edad: String,
  active: {
    type: Boolean,
    default: false
  },
  genero    : {
    type      : String,
    enum      : ['Femenino', 'Masculino', 'N/A'],
    default   : 'N/A'
    },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, 
  versionKey: false
})

module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))
