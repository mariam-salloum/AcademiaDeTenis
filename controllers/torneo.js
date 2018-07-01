'use strict'
/* Clase: torneo
 * Tablas en esquema: torneo
 * Tablas relacionadas: null
 * funcion: Manejo de torneos
 * funciones de busquedas, creacion, modificacion y eliminado
 */

const Torneo = require('../models/torneo')

/* Obtener todas las torneos
 * @req datos de entrada
 * @res datos de respuesta
 */
function getTorneos(req, res){
  Torneo.find({}, (err, Torneos) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Torneos) return res.status(404).send({message: 'No existen Torneos'})

      res.json( Torneos )
  }) 
}
/* Obteniene los torneos de un estado
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getTorneosEstado(req, res){
  let Estado = req.params.Estado              //Estado 

  Torneo.find({estado: Estado}, (err, Torneo) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Torneo) return res.status(404).send({message: `La Torneo no existe`})

      res.json( Torneo )
  })
}

/* Obteniene un torneo por id
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getTorneo(req, res){
  let TorneoId = req.params.TorneoId //id del torneo a buscar

  Torneo.findById(TorneoId, (err, Torneo) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Torneo) return res.status(404).send({message: `El torneo no existe`})

      res.json( Torneo )
  })
}

/* Creacion del torneo
 * @req datos de creacion
 * @res datos de respuesta
 */
function saveTorneo(req, res){
  console.log('POST api/Torneo')
  
  let torneo = new Torneo()
  torneo.nombre = req.body.nombre                 //nombre del torneo
  torneo.fecha = req.body.fecha                   //fecha del torneo
  torneo.hora = req.body.hora                     //hora del torneo
  torneo.lugar = req.body.lugar                   //lugar del torneo
  
  torneo.save((err,TorneoStored) =>{
    if (err) res.status(500).send({message: `Error al guardar ${err}`})
    res.json(TorneoStored)  
  })
}

/* Modificacion de una torneo
 * @req datos de entrada (id del torneo, contenido a modificar)
 * @res datos de respuesta
 */
function updateTorneo(req, res){
  let TorneoId = req.params.TorneoId           //id del torneo a modificar
  let update = req.body                        //data a modificar
  /*Modifica la informacion de la orden*/
  Torneo.findByIdAndUpdate(TorneoId, update, (err, TorneoUpdated) => {//modifica
      if (err) res.status(500).send({message: `Error al actualizar la orden: ${err}`})

      res.json( TorneoUpdated )
  })
}

/* Eliminar un torneo dada
 * @req datos de entrada (id del torneo)
 * @res datos de respuesta
 */
function deleteTorneo(req, res){
  let TorneoId = req.params.TorneoId
    /*Busca la orden por su id*/
    Torneo.findById(TorneoId, (err, Torneo) => {
    /*Elimina el torneo*/  
    if (err) res.status(500).send({message: `Error al borrar la Torneo: ${err}`})
    Torneo.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar la Torneo: ${err}`})
        res.status(200).send({message: 'El Torneo ha sido eliminado'})
    })
  })
}

module.exports = {
  getTorneos,
  getTorneosEstado,
  getTorneo,
  saveTorneo,
  updateTorneo,
  deleteTorneo
}