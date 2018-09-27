const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const duenioSchema = new Schema({
  username: String,
  email: String,
  photoURL: String,
  likeado:{
    type:Boolean,
    default:false
  },
  text:String,
  imageURL:String,
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  likes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

// jajaja justo hice uno, borraré el mio
  module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))