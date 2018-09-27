const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const PLM      = require('passport-local-mongoose')
const userSchema = new Schema({   //oye, en el modelo de dueño, por ejemplo, vamos a poner como estampas
  // de SuperCLean, buen pagador o tal que las personas irán dandole click, tipo las de uber.
  //esa variable también iría en los modelos ¿cierto?
//ese iriia en el de los depas en el nidos por que la propiedad de ese atributo es del dep no del dueno
//pero suguer que eches a andar esto primero o omeras tiempos --> si, cañón, p
//perdimos mucho tiempo en hacer el loggin con fb

//como tip busca en internte how to de likes de face en node con mongo 

// tenemos el de likes de un daily de oswaldo lo voy a abrir e ir metiendo
//vaaaa


  username: String,
  email: String,
  photoURL: String,
  descripcion: String,
  edad: String,
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