'use strict'

const express = require('express')
const atletaCtrl = require('../controllers/atleta')
const userCtrl = require('../controllers/user')
const membresiaCtrl = require('../controllers/membresia')
const categoriaCtrl = require('../controllers/categoria')
const pagoCtrl = require('../controllers/pago')
const promoCtrl = require('../controllers/promo')
const productoCtrl = require('../controllers/producto')
const ordenCtrl = require('../controllers/orden')
const compraCtrl = require('../controllers/compra')
const torneoCtrl = require('../controllers/torneo')
const partCtrl = require('../controllers/participantes')

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
/*Compra*/
api.get('/compras', /*auth,*/ compraCtrl.getCompras)
api.get('/compra/:CompraId', compraCtrl.getCompra)
api.get('/compras/:Estado', compraCtrl.getComprasEstado)
api.post('/compra', auth, compraCtrl.saveCompra)
api.put('/compra/:CompraId', compraCtrl.updateCompra)
/*Pago*/
api.get('/pagos', /*auth,*/ pagoCtrl.getPagos)
api.get('/pago/:PagoId', pagoCtrl.getPago)
api.get('/pagos/:AtletaId', pagoCtrl.getPagosAtleta)
api.post('/pago', /*auth,*/ pagoCtrl.savePago)
api.put('/pago/:PagoId',/* auth,*/ pagoCtrl.updatePago)
api.delete('/pago/:PagoId', /*auth,*/ pagoCtrl.deletePago)
/*Producto*/
api.get('/productos', /*auth,*/ productoCtrl.getProductos)
api.get('/producto/:ProductoId', productoCtrl.getProducto)
api.post('/producto', /*auth,*/ productoCtrl.saveProducto)
api.put('/producto/:ProductoId',/* auth,*/ productoCtrl.updateProducto)
api.delete('/producto/:ProductoId', /*auth,*/ productoCtrl.deleteProducto)
/*Ordenes*/
api.get('/ordenes', /*auth,*/ ordenCtrl.getOrdenes)
api.get('/ordenes/:Estadp', /*auth,*/ ordenCtrl.getOrdenEstado)
api.get('/orden/:OrdenId', ordenCtrl.getOrden)
api.get('/orden/user/:UserId', ordenCtrl.getOrdenCliente)
api.get('/orden/compra/:CompraId', ordenCtrl.getOrdenCompra)
api.post('/orden', auth, ordenCtrl.saveOrden)
api.put('/orden/:OrdenId',/* auth,*/ ordenCtrl.updateOrden)
api.delete('/orden/:OrdenId', /*auth,*/ ordenCtrl.deleteOrden)
/*Promocion*/
api.get('/promos', /*auth,*/ promoCtrl.getPromos)
api.get('/promo/:PromoId', promoCtrl.getPromo)
api.get('/promo/atleta/:AtletaId', promoCtrl.getPromosAtleta)
api.post('/promo', /*auth,*/ promoCtrl.savePromo)
/*Torneo*/
api.get('/torneos', /*auth,*/ torneoCtrl.getTorneos)
api.get('/torneos/:Estado', /*auth,*/ torneoCtrl.getTorneos)
api.get('/torneo/:TorneoId', torneoCtrl.getTorneo)
api.post('/torneo', /*auth,*/ torneoCtrl.saveTorneo)
api.put('/torneo/:TorneoId',/* auth,*/ torneoCtrl.updateTorneo)
api.delete('/torneo/:TorneoId', /*auth,*/ torneoCtrl.deleteTorneo)
/*Participante*/
api.get('/participantes/:TorneoId', /*auth,*/ partCtrl.getParticipantesTorneo)//Participantes de un torneo
api.get('/participantes', partCtrl.getParticipancionesTorneos)//Participantes de todos los torneos
api.post('/participante', /*auth,*/ partCtrl.saveParticipante)//Agrega participantes al torneo
api.post('/participante/avance/:TorneoId', /*auth,*/ partCtrl.nextParticipante)//Agrega participantes al torneo
api.delete('/participante/:TorneoId/:ParticipanteId', /*auth,*/ partCtrl.deleteParticipante)
/*Manejo Usuarios*/
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/get', userCtrl.users)//De prueba agregar el authAdmin
api.get('/get/atletas', userCtrl.usersTN)//De prueba agregar el authAdmin
api.get('/get/admins', userCtrl.usersTA)//De prueba agregar el authAdmin
api.get('/perfil', auth, userCtrl.perfil)
api.get('/perfil/:UserId', /*auth,*/ userCtrl.getUserId)
api.get('/users/morosos', authAdmin, userCtrl.usersM)
api.get('/users/dia', authAdmin, userCtrl.usersA)
api.get('/users/espera', authAdmin, userCtrl.usersP)
api.get('/users/edad/:UserId', userCtrl.edad)
api.get('/users/membresia/:nombreMbs',/*authAdmin,*/ userCtrl.usersMembresia)
api.get('/users/categoria/:nombreCtg',/*authAdmin,*/ userCtrl.usersCategoria)
api.get('/users/sexo/:sexoAtl',/*authAdmin,*/ userCtrl.usersSexo)
api.get('/user/datos/:UserEmail', userCtrl.getUser)
api.put('/user/:UserId', /*auth,*/ userCtrl.update)
api.delete('/user/:UserId',/* auth,*/ userCtrl.deleteUser)
api.get('/private', authAdmin, (req, res) => {
  res.status(200).send({ message: req.user })
})

module.exports = api