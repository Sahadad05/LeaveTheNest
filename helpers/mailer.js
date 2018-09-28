const nodemailer  = require('nodemailer')
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAILPASS
  }
})

exports.welcomeMail=(username, email)=>{
  
  transporter.sendMail({
    from:'"Leave the Nest" <contacto.leavethenest@gmail.com>',
    to:email,
    subject:'¡Bienvenido!',
    html:`
      <h2>¡Bienvenido ${username}! Nos emociona acompañarte en este primer paso de la nueva etapa de tu vida
      ¿Estás listo? 😃 
      El primer paso es definir en dónde quieres vivir y qué características estás buscando
      ***Link***
      </h2>
    `
  }).then(info=>{
    console.log(info)
  }).catch(error=>{
    console.log(error)
    throw error
  })

}