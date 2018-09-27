const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const nidoSchema = new Schema({
  nidoName: String,
  fotoURL: String,
  descripcion: String,
  precio: String,
  tipo_nido:[{
    type:String,
    enum: ['Casa','Departamaneto','Cuarto'],
    default:'Casa'
  }],
  roomies:Number,
  baño: [{
    type: String,
    enum: ['Solo', 'Compartido', 'Indiferente'],
    default:'Solo'
  }],
  adress: String,
  amueblado: [{
    type: String,
    enum: ['Si','No'],
    default: 'No'
  }],
  estacionamiento:[{
    type: String,
    enum: ['Si','No','Indiferente'],
    default:'No'
  }],
  petFriendly:[{
    type: String,
    enum: ['Si','No','Indiferente'],
    default: 'Si'
  }]
}, {//esos datos de s ser booleanos true r false pero si no te quieresmeter en swithc con el hbs dejalo asi 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})
module.exports = mongoose.model('Nido', nidoSchema)