'use strict'
/* Clase: orden
 * Tablas en esquema: orden
 * Tablas relacionadas: usuario y compra  
 * funcion: Manejo de las ordenes ya sean administradores o atletas
 * funciones de busquedas, registro, modificacion y eliminado
 */
const Orden = require('../models/orden')
const service = require('../services')
const jwt = require('jwt-simple')
const config = require('../config')
const func = require('./funciones')

/* Obtener todas las ordenes
 * @req datos de entrada
 * @res datos de respuesta
 */
function getOrdenes(req, res){
  Orden.find({}, (err, Ordenes) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Ordenes) return res.status(404).send({message: 'No existen Ordenes'})

      res.json( Ordenes )
  }) 
}

/* Obteniene una orden por id
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getOrden(req, res){
  let OrdenId = req.params.OrdenId //id de la orden a buscar

  Orden.findById(OrdenId, (err, Orden) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Orden) return res.status(404).send({message: `La orden no existe`})

      res.json( Orden )
  })
}

/* Obteniene una orden por id del usuario
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getOrdenCliente(req, res){
  let UserId = req.params.UserId //id del user de la compra

  Orden.find({user: UserId}, (err, Orden) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Orden) return res.json({message: `No existen ordenes`})

      res.json( Orden )
  })
}

/* Obteniene una orden por id del usuario
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getOrdenCompra(req, res){
  let CompraId = req.params.CompraId //id de la venta de la orden

  Orden.find({compra: CompraId}, (err, Orden) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Orden) return res.json({message: `No existen ordenes`})

      res.json( Orden )
  })
}
/* Obteniene las compras de un estado
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getOrdenEstado(req, res){
  let Estado = req.params.Estado              //Estado 

  Orden.find({estado: Estado}, (err, Orden) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Orden) return res.status(404).send({message: `La Orden no existe`})

      res.json( Orden )
  })
}
/* Creacion de la orden
 * @req datos de creacion
 * @res datos de respuesta
 */
function saveOrden(req, res){
  console.log('POST api/Orden')
  console.log(req.body)
  console.log(req.user)
  var aux = req.user
  
  let orden = new Orden()
  orden.producto = req.body.producto             //producto de la orden
  orden.user = aux                               //descripcion de la orden
  orden.compra = req.body.compra
  
  orden.save((err,OrdenStored) =>{
    if (err) res.status(500).send({message: `Error al guardar ${err}`})
    res.json(OrdenStored)  
  })
}

/* Modificacion de una orden
 * @req datos de entrada (id de la orden, contenido a modificar)
 * @res datos de respuesta
 */
function updateOrden(req, res){
  let OrdenId = req.params.OrdenId           //id de la orden a modificar
  let update = req.body                      //data a modificar
  /*Modifica la informacion de la orden*/
  Orden.findByIdAndUpdate(OrdenId, update, (err, OrdenUpdated) => {//modifica
      if (err) res.status(500).send({message: `Error al actualizar la orden: ${err}`})

      res.json( OrdenUpdated )
  })
}

/* Eliminar una orden dada
 * @req datos de entrada (id de la orden)
 * @res datos de respuesta
 */
function deleteOrden(req, res){
  let OrdenId = req.params.OrdenId
    /*Busca la orden por su id*/
    Orden.findById(OrdenId, (err, Orden) => {
    /*Elimina el orden*/  
    if (err) res.status(500).send({message: `Error al borrar la Orden: ${err}`})
    Orden.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar la Orden: ${err}`})
        res.status(200).send({message: 'El Orden ha sido eliminado'})
    })
  })
}

module.exports = {
  getOrdenes,
  getOrden,
  getOrdenCliente,
  getOrdenCompra,
  getOrdenEstado,
  saveOrden,
  updateOrden,
  deleteOrden
}