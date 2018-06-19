'use strict'

const express = require('express')
const atletaCtrl = require('../controllers/atleta')
const userCtrl = require('../controllers/user')
const membresiaCtrl = require('../controllers/membresia')
const categoriaCtrl = require('../controllers/categoria')
const pagoCtrl = require('../controllers/pago')
const promoCtrl = require('../controllers/promo')

const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const api = express.Router()
/*eliminar esto despues*/
api.get('/atleta', /*auth,*/ atletaCtrl.getAtletas)
api.get('/atleta/:atletaId', atletaCtrl.getAtleta)
api.post('/atleta', /*auth,*/ atletaCtrl.saveAtleta)
api.put('/atleta/:atletaId',/* auth,*/ atletaCtrl.updateAtleta)
api.delete('/atleta/:atletaId', /*auth,*/ atletaCtrl.deleteAtleta)
/*membresia*/
api.get('/membresias', /*authAdmin,*/ membresiaCtrl.getMembresias)
api.get('/membresia/:MembresiaId', membresiaCtrl.getMembresia)
api.post('/membresia', authAdmin, membresiaCtrl.saveMembresia)
api.put('/membresia/:MembresiaId',/* auth,*/ membresiaCtrl.updateMembresia)
api.delete('/membresia/:MembresiaId', /*auth,*/ membresiaCtrl.deleteMembresia)//Falta acomodar el update_by
/*categoria*/
api.get('/categorias', /*auth,*/ categoriaCtrl.getCategorias)
api.get('/categoria/:CategoriaId', categoriaCtrl.getCategoria)
api.post('/categoria', authAdmin, categoriaCtrl.saveCategoria)
api.put('/categoria/:CategoriaId',/* auth,*/ categoriaCtrl.updateCategoria)//Falta acomodar el update_by
api.delete('/categoria/:CategoriaId', /*auth,*/ categoriaCtrl.deleteCategoria)
/*Pago*/
api.get('/pagos', /*auth,*/ pagoCtrl.getPagos)
api.get('/pago/:PagoId', pagoCtrl.getPago)
api.get('/pagos/:AtletaId', pagoCtrl.getPagosAtleta)
api.post('/pago', /*auth,*/ pagoCtrl.savePago)
api.put('/pago/:PagoId',/* auth,*/ pagoCtrl.updatePago)
api.delete('/pago/:PagoId', /*auth,*/ pagoCtrl.deletePago)
/*Promocion*/
api.get('/promos', /*auth,*/ promoCtrl.getPromos)
api.get('/promo/:PromoId', promoCtrl.getPromo)
api.get('/promo/atleta/:AtletaId', promoCtrl.getPromosAtleta)
api.post('/promo', /*auth,*/ promoCtrl.savePromo)
/*Manejo Usuarios*/
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/get', userCtrl.users)//De prueba agregar el authAdmin
api.get('/get/atletas', userCtrl.usersTN)//De prueba agregar el authAdmin
api.get('/get/admins', userCtrl.usersTA)//De prueba agregar el authAdmin
api.get('/perfil', auth, userCtrl.perfil)
api.get('/users/morosos', authAdmin, userCtrl.usersM)
api.get('/users/dia', authAdmin, userCtrl.usersA)
api.get('/users/espera', authAdmin, userCtrl.usersP)
api.get('/users/membresia/:nombreMbs',/*authAdmin,*/ userCtrl.usersMembresia)
api.get('/users/categoria/:nombreCtg',/*authAdmin,*/ userCtrl.usersCategoria)
api.get('/users/sexo/:sexoAtl',/*authAdmin,*/ userCtrl.usersSexo)
api.get('/user/datos/:UserEmail', userCtrl.getUser)
api.put('/user/update/:UserId', /*auth,*/ userCtrl.update)
api.delete('/user/delete/:UserId',/* auth,*/ userCtrl.deleteUser)
api.get('/private', authAdmin, (req, res) => {
  res.status(200).send({ message: req.user })
})

module.exports = api