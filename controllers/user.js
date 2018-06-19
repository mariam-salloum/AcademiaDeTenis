'use strict'
/* Clase: user
 * Tablas en esquema: persona, atleta, representante y admin
 * Tablas relacionadas: membresia, pago y categoria
 * funcion: Manejo de usuarios ya sean administradores o atletas
 * funciones de busquedas, registro, login, modificacion y eliminado
 */
const User = require('../models/user')
const service = require('../services')
const jwt = require('jwt-simple')
const config = require('../config')
const func = require('./funciones')

/* Registro lee los datos de entrada, lo guarda en un nuevo usuario y logea
 * @req datos de entrada
 * @res datos de respuesta
 */
function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    nombreAtl: req.body.nombreAtl,
    apellidoAtl: req.body.apellidoAtl,
    cedulaAtl: req.body.cedulaAtl,
    fechaNacAtl: req.body.fechaNacAtl,
    telefonoAtl: req.body.telefonoAtl,
    sexoAtl: req.body.sexoAtl,
    password: req.body.password,
    nombreCtg: req.body.nombreCtg,
    nombreMbs: req.body.nombreMbs,
    precioMbs: req.body.precioMbs,
    estadoCta: 'Al dia',
    emailRpr: req.body.emailRpr,
    nombreRpr: req.body.nombreRpr,
    apellidoRpr: req.body.apellidoRpr,
    cedulaRpr: req.body.cedulaRpr,
    fechaNacRpr: req.body.fechaNacRpr,
    telefonoRpr: req.body.telefonoRpr,
    parentesco: req.body.parentesco,
    tipo: req.body.tipo,
    pin: req.body.pin
  })
  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    if (user.tipo == "admin"){
      return res.status(201).send({token: service.createTokenAdmin(user)})
    }
    else{
      return res.status(201).send({ token: service.createToken(user) })
    }
  })
}

/* Login, lee el email y pass para acceder y crear su token
 * @req datos de entrada
 * @res datos de respuesta
 */
function signIn (req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(400).send({ message: 'No existe el usuario' })

    req.user = user

    if(user.tipo == "admin"){
      res.json(service.createTokenAdmin(user))
      /*res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createTokenAdmin(user)
      })*/
    }else{
      res.json(service.createToken(user))
      /*res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(user)
      })*/
    }
  })
}

/* Modificar usuario
 * @req datos de entrada
 * @res datos de respuesta
 */
function update (req, res) {
  let UserId = req.params.UserId  //Id del usuario
  let update = req.body           //Datos a modificar
  User.findByIdAndUpdate(UserId, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

    res.status(200).send({ user: userUpdated })
  })
}

/* Eliminar usuario 
 * @req datos de entrada
 * @res datos de respuesta
 */
function deleteUser(req, res){
  let UserId = req.params.UserId  //Id del usuario

    User.findById(UserId, (err, user) => {
    if (err) res.status(500).send({message: `Error al borrar el atleta: ${err}`})
      user.remove(err => {
          if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
          res.status(200).send({message: 'El usuario ha sido eliminado'})
      })
  })
}

/* Obtener todos los usuarios existentes
 * @req datos de entrada
 * @res datos de respuesta
 */
function users(req, res){
  var hoy = new Date()
      console.log(hoy)
      //console.log(user.fechaNacAtl)
  User.find({}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})
        console.log(users[0].fechaIngAtl)
        var ed = parseInt((hoy - users[0].fechaIngAtl)/365/24/60/60/1000)

        console.log(ed)
      res.json(users) 
  }) 
}
/*
 *
 */
function edad(req, user){
  let UserId = req.params.UserId  //Id del usuario
  User.findById(UserId, (err, user) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!user) return res.status(404).send({message: 'No existe el usuario'})
      var hoy = new Date()
      var ed = parseInt((hoy - users[0].fechaIngAtl)/365/24/60/60/1000)
      if (ed > 18) {
        res.json(user)  
      }
      else{
        res.send(400,)
      }

  })
}

/*
 *
 */
function getUserId(req, user){
  let UserId = req.params.UserId  //Id del usuario
  User.findById(UserId, (err, user) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!user) return res.status(404).send({message: 'No existe el usuario'})
      res.json(user)

  })
}
/* Obtener todos los usuarios atletas existentes
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersTN(req, res){
  User.find({tipo: "user"}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})//85047373021425
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  }) 
}

/* Obtener todos los usuarios administradores existentes
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersTA(req, res){
  User.find({tipo: "admin"}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  }) 
}

/* Obtener todos los usuarios que deban la mensualidad
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersM(req, res){
  User.find({estadoCta: "Moroso"}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  })
}

/* Obtener todos los usuarios que esperen confirmacion de pago
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersP(req, res){
  User.find({estadoCta: "Esperando confirmacion"}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  })
}

/* Obtener todos los usuarios que esten al dia con la membresia
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersA(req, res){
  User.find({estadoCta: "Al dia"}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  })
}

/* Obtener todos los usuarios de una membresia dada
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersMembresia(req, res){
  User.find({nombreMbs: req.params.nombreMbs}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  })
}

/* Obtener todos los usuarios de una categoria dada
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersCategoria(req, res){
  User.find({nombreCtg: req.params.nombreCtg}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  })
}

/* Obtener todos los usuarios de un sexo dado
 * @req datos de entrada
 * @res datos de respuesta
 */
function usersSexo(req, res){
  User.find({sexoAtl: req.params.sexoAtl}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  })
}

/* Obtener todos los datos de un usuario
 * @req datos de entrada
 * @res datos de respuesta
 */
function perfil(req, res){
  var aux = func.trimUser(req.user.sub())
  User.findOne({_id: aux}, (err, users) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!users) return res.status(404).send({message: 'No existen usuarios'})

      res.json(users)
  })
}
/* Obtener todos los datos de un usuario por su correo
 * @req datos de entrada
 * @res datos de respuesta
 */
function getUser(req, res){
  let UserEmail = req.params.UserEmail
  
  User.find({email: UserEmail}, (err, user) =>{
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: `El atleta no existe`})

      res.json(user)
  })
}

module.exports = {
  signUp,
  signIn,
  update,
  deleteUser,
  users,
  usersTN,
  usersTA,
  usersM,
  usersP,
  usersA,
  usersMembresia,
  usersCategoria,
  usersSexo,
  perfil,
  edad,
  getUserId,
  getUser
}