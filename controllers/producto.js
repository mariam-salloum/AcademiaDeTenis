'use strict'
/* Clase: producto
 * Tablas en esquema: producto
 * Tablas relacionadas: null
 * funcion: Manejo de productos ya sean administradores o atletas
 * funciones de busquedas, registro, login, modificacion y eliminado
 */
const Producto = require('../models/producto')
const service = require('../services')
const jwt = require('jwt-simple')
const config = require('../config')
const func = require('./funciones')

/* Obtener todas los productos
 * @req datos de entrada
 * @res datos de respuesta
 */
function getProductos(req, res){
  Producto.find({}, (err, Productos) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Productos) return res.status(404).send({message: 'No existen Productos'})

      res.json( Productos )
  }) 
}

/* Obteniene un producto por id
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getProducto(req, res){
  let ProductoId = req.params.ProductoId //id del prodcuto a buscar

  Producto.findById(ProductoId, (err, Producto) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Producto) return res.status(404).send({message: `El Producto no existe`})

      res.json( Producto )
  })
}

/* Creacion de producto
 * @req datos de creacion
 * @res datos de respuesta
 */
function saveProducto(req, res){
  console.log('POST api/Producto')
  console.log(req.body.nombre)

  let producto = new Producto()
  producto.nombre = req.body.nombre                 //nombre del producto
  producto.descripcion = req.body.descripcion       //descripcion del producto
  producto.precio = req.body.precio                 //precio del producto
  producto.cantidad = req.body.cantidad             //cantidad del producto
  producto.tipo = req.body.tipo                     //tipo del producto
  
  producto.save((err,ProductoStored) =>{
    if (err) res.status(500).send({message: `Error al guardar ${err}`})
    res.json(ProductoStored)  
  })
}

/* Modificacion de un producto
 * @req datos de entrada (id de producto, contenido a modificar)
 * @res datos de respuesta
 */
function updateProducto(req, res){
  let ProductoId = req.params.ProductoId     //id del producto a modificar
  let update = req.body                      //data a modificar
  /*Modifica la informacion del producto*/
  Producto.findByIdAndUpdate(ProductoId, update, (err, ProductoUpdated) => {//modifica
      if (err) res.status(500).send({message: `Error al actualizar el Producto: ${err}`})

      res.json( ProductoUpdated )
  })
}

/* Eliminar un producto dada
 * @req datos de entrada (id del producto)
 * @res datos de respuesta
 */
function deleteProducto(req, res){
  let ProductoId = req.params.ProductoId
    /*Busca el producto por su id*/
    Producto.findById(ProductoId, (err, Producto) => {
    /*Elimina el producto*/  
    if (err) res.status(500).send({message: `Error al borrar el Producto: ${err}`})
    Producto.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar el Producto: ${err}`})
        res.status(200).send({message: 'El Producto ha sido eliminado'})
    })
  })
}

module.exports = {
  getProductos,
  getProducto,
  saveProducto,
  updateProducto,
  deleteProducto
}