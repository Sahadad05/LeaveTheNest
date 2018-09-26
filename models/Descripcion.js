const Schema = require('mongoose').Schema

const descripcionSchema = new Schema({
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('Descripcion', descripcionSchema)