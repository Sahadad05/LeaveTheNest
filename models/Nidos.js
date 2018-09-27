const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const nidoSchema = new Schema({
  name: String,
  descripcion: String,
  created_by: {type: mongoose.Schema.Types.ObjectId, ref:'Dueno'},
 //con este se liga al otro coleccion de user cuando un usuario entre y haga ese test se va a ligar ese modelo 
 
  precio: Number,
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
  location:{ type:{ type:String, }, coordinates:[Number] },//este jala las coordenadas
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
  }],
  stamps: 

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})
nidoSchema.index({ location: '2dsphere' }); //esto es oara la geolocalizacion
module.exports = mongoose.model('Nido', nidoSchema)

// le meto precio también ¿no? como ?
//precio de las rentas del nidito jaja
//aaa pues puede ser pero esa no lo crea quien pone a la renta el depto por que en ese caso 
//dbes de poner un rango de precio aca igual que los que hicimos hace n momento para que se guarden en 
//tu json
//ando pensando jaja en cuál será la mejor forma, porque ya había olvidado el precio y es un factor
//que también influye
//necesitas hacr otro odelo que guarde los deptos es decir cuando un User enttre y pueda escogger hacer un 
//depto o ponerloa la renta debe de ponerle los parametros qye estamos poniendo + renta precio
/* o sea en este mismo no se puede, cierto ? pues si pero este no es para hacer match o es el que generaa el ue
r 

ah cierto cierto
sorry, ando dormida 
sería el modelo match ¿no? si este seria el de match caso de uso { yo entro a la app y me registro
//una ves registrado puedo hacer esta formulario para que eso se guarde en mi base de user o se lige
//pro si entra otro user y este no quiere renta este queire poner a la renta uno debe de tener otro luhhar donde poner los depts
//que se supne va a rentar y eso con los que escoge en este es donde se hara el match osea 
//en un punto va a hacer converger 3 modelos en un punto un un Owner y dos user con sus respectivo gustos}
oooooooh no ma, deberías de dar clase jajaja a los que andamos medio perdidos
//jajaja bueno ya son la 1 te pasaste de tueste pero bueno entonces debes hacer que este ndelo se una a user 
y s haces otro modelo o roles de user para qqe uno se admin y otro user asi los dos entran con el mismo modelo
y evitas uno pero el de depto en convreto si debe de ir creo 
si, yo igual para que jale toda la info y pueda hacer el match. 
O sea, aguanta se mecruzan los cables. debemos de tener un modelo para los que renten, otro para los que busque, el de las propiedades y hacerlos converger ¿no?
