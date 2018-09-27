const Schema = require('mongoose').Schema
const descripcionSchema = new Schema({
  body: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('Descripcion', descripcionSchema)