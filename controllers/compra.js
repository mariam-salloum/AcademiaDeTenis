'use strict'
/* Clase: compra
 * Tablas en esquema: compra, factura y recibo
 * Tablas relacionadas: user, producto y orden
 * funcion: Manejo de las compras
 * funciones de busquedas, registro, modificacion y eliminado
 */ 
const Compra = require('../models/compra')
const Orden = require('../models/orden')
const Producto = require('../models/producto')
const service = require('../services')
const jwt = require('jwt-simple')
const config = require('../config')
const func = require('./funciones')

/* Obtener todas las Compras
 * @req datos de entradaCompra
 * @res datos de respuesta
 */
function getCompras(req, res){
  Compra.find({}, (err, Compras) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Compras) return res.status(404).send({message: 'No existen Compras'})

      res.json( Compras )
  }) 
}

/* Obteniene una Compra por id
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getCompra(req, res){
  let CompraId = req.params.CompraId //id de la Compra a buscar

  Compra.findById(CompraId, (err, Compra) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Compra) return res.status(404).send({message: `La Compra no existe`})

      res.json( Compra )
  })
}

/* Obteniene las compras de un estado
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getComprasEstado(req, res){
  let Estado = req.params.Estado              //Estado 

  Compra.find({estado: Estado}, (err, Compra) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Compra) return res.status(404).send({message: `La Compra no existe`})

      res.json( Compra )
  })
}

/* Obteniene las compras de un cliente
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getComprasCliente(req, res){
  let UserId = req.params.UserId //id del user de la compra

  Compra.find({user: UserId}, (err, Compras) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Compras) return res.json({message: `No existen ordenes`})

      res.json( Compras )
  })
}

/* Creacion de la compra
 * @req datos de creacion
 * @res datos de respuesta
 */
function saveCompra(req, res){
  console.log('POST api/Compra')
  //console.log(req.body)
  //console.log(req.user)
  var aux = req.user
  var total = 0;
  let compra = new Compra()
  compra.codigo = req.body.codigo                 //producto de la Compra
  compra.fecha = req.body.fecha                   //producto de la Compra
  compra.user = aux                               //descripcion de la Compra
  let tempo;
  let idC = compra._id
  var cond = false
  var cambiar
  //console.log(compra +" HOLI")
  setTimeout(function(){
      Orden.find({user: aux, estado: "Pendiente"}, (err, Ordenes) =>{
        for (var i = Ordenes.length - 1; i >= 0; i--) {
          //console.log(Ordenes[i] + "/" + i)
          tempo = Ordenes[i]._id
          cambiar = Ordenes[i]
          Producto.findOne({nombre: Ordenes[i].producto}, (err, producto)=>{
            if(err || !producto ){
              console.log("")
            }else{
              if(producto.cantidad>0){
                console.log("PAVE")
                var cambio;
                Orden.findOneAndUpdate({user: aux, producto: producto.nombre, estado: "Pendiente"}, {$set: {estado: "Esperando Confirmacion"}}, (err,ord)=>{
                  console.log(ord)
                  //cambio = ord
                 // console.log(id)
                  /*Orden.findById(ord._id, (err,x)=>{
                    console.log(x)
                  })*/
                 /* Orden.findByIdAndUpdate(ord._id, {$set: {estado: "Esperando Confirmacion"}}, (err,ordStored)=>{
                    console.log(ordStored)
                  })*/
                })
                console.log(cambio)
                cond = true;
                let value = producto.cantidad - 1
                let estado = 'Esperando Confirmacion'
                total += producto.precio
                /*Producto.findByIdAndUpdate(producto._id, {$set: {cantidad: value}}, (err,pro)=>{
                  console.log(pro)
                })*/
                /*Orden.findByIdAndUpdate(cambiar._id, {$set: {compra: idC, estado: estado}}, (err,ord)=>{
                      console.log(ord+"GGGGGG")
                    })
*/  
          
          
                /*console.log("PA VE: "+ cambiar)
                console.log("PA VE2: "+ tempo)
                Orden.find({estado: "Pendiente", producto: producto._id, user: aux}, (err, ords)=>{
                  console.log("********************* "+ ords)
                  console.log(ords.length)
                  for (var i = ords.length - 1; i >= 0; i--) {
                    console.log(ords[i]._id + "GGGASDDSAasasds")
                    console.log(ords[i] + "GGGASDDSA")
                    Orden.findByIdAndUpdate(ords[i]._id, {$set: {compra: idC, estado: estado}}, (err,ord)=>{
                      console.log(ord+"GGGGGG")
                    })
                  }
                })
                console.log("//////////////////////")*/
                
              }
            }
          })
          if(cond){
            console.log('holi' + tempo)
            Orden.findByIdAndUpdate(tempo, {$set: {compra: idC, estado: estado}}, (err,ord)=>{
              console.log(ord+"GGGGGG")
            })
            cond =false;
          }
        }
      })
  },1000);
  
  setTimeout(function(){
    compra.save((err,CompraStored) =>{
      if (err) res.status(500).send({message: `Error al guardar ${err}`})
        res.json(CompraStored)  
    })
  },3000)
}

/* Modificacion de una Compra
 * @req datos de entrada (id de la Compra, contenido a modificar)
 * @res datos de respuesta
 */
function updateCompra(req, res){
  let CompraId = req.params.CompraId           //id de la Compra a modificarCompra
  let update = req.body                      //data a modificar
  /*Modifica la informacion de la Compra*/
  Compra.findByIdAndUpdate(CompraId, update, (err, CompraUpdated) => {//modifica
      if (err) res.status(500).send({message: `Error al actualizar la orden: ${err}`})

      res.json( CompraUpdated )
  })
}



module.exports = {
  getCompras,
  getCompra,
  getComprasCliente,
  saveCompra,
  getComprasEstado,
  updateCompra
}