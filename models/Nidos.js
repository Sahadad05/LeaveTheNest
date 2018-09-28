const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const nidosSchema = new Schema({
  tipo_nido:{
    type:String,
    enum: ['Casa','Departamento','Cuarto'],
    default:'Departamento'
  },
  location:{
    type:{
        type:String,
        default:'Point'
    },
    address:String,
    coordinates:[{
        type:Number
    }]

},
  precio: Number,
  roomies:Number,
  genero: {
    type: String,
    enum: ['Femenino', 'Masculino', 'N/A'],
    default:'N/A'
  },
  baño: {
    type: String,
    enum: ['Solo', 'Compartido', 'Indiferente'],
    default:'Solo'
  },
  amueblado: {
    type: String,
    enum: ['Si','No'],
    default: 'No'
  },
  estacionamiento:{
    type: String,
    enum: ['Si','No','Indiferente'],
    default:'No'
  },
  petFriendly:{
    type: String,
    enum: ['Si','No','Indiferente'],
    default: 'Si'
  },
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false

})
//nidosSchema.index({ location: '2dsphere' }); 
module.exports = mongoose.model('Nidos', nidosSchema)
