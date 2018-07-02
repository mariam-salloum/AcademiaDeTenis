'use strict'
/* Clase: Participante
 * Tablas en esquema: torneo
 * Tablas relacionadas: torneo, user
 * funcion: Manejo de torneos
 * funciones de busquedas, creacion, modificacion y eliminado
 */

const Participante = require('../models/participante')
//const Torneo = require('../models/torneo')

/* Obtener todas los participantes de un torneo
 * @req datos de entrada
 * @res datos de respuesta
 */
function getParticipantesTorneo(req, res){
  let TorneoId = req.params.TorneoId

  Participante.find({torneo: TorneoId}, (err, Participantes) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Participantes) return res.status(404).send({message: 'No existen Participantes'})

      res.json( Participantes )
  }) 
}

/* Obtener todas los participantes de un torneo
 * @req datos de entrada
 * @res datos de respuesta
 */
function getParticipancionesTorneos(req, res){
  var aux = req.user

  Participante.find({jugador: aux}, (err, Torneos) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!Torneos) return res.status(404).send({message: 'No existen Torneos'})

      res.json( Torneos )
  }) 
}
/* Obtener todas los participantes de un torneo
 * @req datos de entrada
 * @res datos de respuesta
 */
function getTorneosParticipantes(req, res){
  let UserId = req.params.UserId
  var aux;
  Participante.find({jugador: UserId}).distinct('torneo', (err,por)=>{
    aux = por
    Torneo.find({_id: aux}, (err,x)=>{
      res.json(x)
    })
  })
}
/* Agregar participante
 * @req datos de creacion
 * @res datos de respuesta
 */
function saveParticipante(req, res){
  console.log('POST api/Participante')
  let part = new Participante()
  part.jugador = req.body.jugador                    //nombre del participante
  part.nombre = req.body.nombre
  part.torneo = req.body.torneo                      //fecha del participante
  part.ronda = 1                                     //hora del participante
  let aux ;
  Participante.find({},(err,values)=>{
    if(err){
      return res.status(500).send({message: `Error al realizar la petición ${err}`})
    }
    if(!values){
      aux = 1
    }else{
      var pos = 1
      for (var i = values.length - 1, pos = values.length; i >= 0; i--) {
        values[i];
      }
      aux = pos + 1
    }
    part.posicion = aux
    part.save((err,TorneoStored) =>{
      if (err) res.status(500).send({message: `Error al guardar ${err}`})
      res.json(TorneoStored)  
    })
  })
  console.log('AYUDA'+ aux)
  
}

/* Avanzar al participante 
 * @req datos de creacion
 * @res datos de respuesta
 */
function nextParticipante(req, res){
  let TorneoId = req.params.TorneoId

  let part = new Participante()
  part.jugador = req.body.jugador                  //nombre del participante
  part.nombre = req.body.nombre
  part.torneo = req.body.torneo                  //fecha del participante
  part.ronda = req.body.ronda                       //hora del participante

  Participante.find({ronda: req.body.ronda},(err,values)=>{
    if(err){
      return res.status(500).send({message: `Error al realizar la petición ${err}`})
    }
    if(!values){
      part.posicion = 1;
      console.log(0)
    }else{
      var pos = 1
      for (var i = values.length - 1, pos = values.length; i >= 0; i--) {
        values[i];
      }
      part.posicion = pos + 1
      console.log(part.posicion)
    }
    part.save((err,TorneoStored) =>{
      if (err) res.status(500).send({message: `Error al guardar ${err}`})
      res.json(TorneoStored)  
    })
  })
  
  Participante.findOneAndUpdate({torneo: TorneoId, jugador: req.body.eliminado, ronda: req.body.ronda-1},
                                {$set: {estado: 'Eliminado'} }, (err, partDelete)=>{
                                  console.log(partDelete)
                                })
}

/* Eliminar un participante de un torneo
 * @req datos de entrada (id del torneo, id del participante)
 * @res datos de respuesta
 */
function deleteParticipante(req, res){
  let TorneoId = req.params.TorneoId
  let ParticipanteId = req.params.ParticipanteId
    /*Busca la orden por su id*/
    Participante.find({torneo: TorneoId, jugador: ParticipanteId}, (err, participante) => {
    /*Elimina el torneo*/  
    if (err) res.status(500).send({message: `Error al borrar: ${err}`})
    participante.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar al jugador: ${err}`})
        res.status(200).send({message: 'El jugador ha sido eliminado'})
    })
  })
}

module.exports = {
  getParticipantesTorneo,
  getParticipancionesTorneos,
  saveParticipante,
  nextParticipante,
  deleteParticipante
}