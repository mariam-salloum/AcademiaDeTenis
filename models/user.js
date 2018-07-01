'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
  //Datos del atleta
  email: { type: String, unique: true, lowercase: true },
  nombreAtl: String,
  apellidoAtl: String,
  cedulaAtl: String,
  fechaNacAtl: Date,
  fechaIngAtl: {type: Date, default: Date.now()},
  telefonoAtl: Number,
  sexoAtl: {type: String, enum:['masculino','femenino', 'otro']},
  avatar: String,
  password: { type: String, select: false },
  //Datos del representante
  emailRpr: { type: String, lowercase: true },
  nombreRpr: String,
  apellidoRpr: String,
  cedulaRpr: String,
  fechaNacRpr: String,
  telefonoRpr: Number,
  parentesco: {type: String, enum:['padre','madre', 'otro']},
  pin: { type: String, select: false },
  //Datos categoria
  nombreCtg: String,
  //Datos membresia
  nombreMbs: String,
  precioMbs: Number,
  //Datos pago
  estadoCta: {type: String, enum:['Al dia', 'Moroso', 'Esperando confirmacion'], default: 'Esperando confirmacion'},
  //Datos de sesion
  tipo : {type: String, enum:['admin', 'user'], default: 'user'},
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

UserSchema.pre('save', (next) => {
  let user = this
  //if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.gravatar = function () {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)