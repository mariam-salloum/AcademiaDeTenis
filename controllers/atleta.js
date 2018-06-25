'use strict'

const Atleta = require('../models/atleta')

function getAtletas(req, res){
	Atleta.find({}, (err, atletas) => {
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!atletas) return res.status(404).send({message: 'No existen atletas'})

    	res.send(200, { atletas })
	})
}

function getAtleta(req, res){
	let atletaId = req.params.atletaId

	Atleta.findById(atletaId, (err, atleta) => {
   		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!atleta) return res.status(404).send({message: `El atleta no existe`})

    	res.status(200).send({ atleta })
	})
}

function saveAtleta(req, res){
	console.log('POST api/atleta')
	console.log(req.body)

	let atleta = new Atleta()
	atleta.nombre = req.body.nombre
	atleta.apellido = req.body.apellido
	atleta.sexo = req.body.sexo
	atleta.nacionalidad = req.body.nacionalidad
	atleta.fechaNacimiento = req.body.fechaNacimiento
	atleta.fechaIngreso = req.body.fechaIngreso

	atleta.save((err,atletaStored) =>{
		if (err) res.status(500).send({message: `Error al guardar ${err}`})
		res.status(200).send({atleta: atletaStored})	
	})
}

function updateAtleta(req, res){
	let atletaId = req.params.atletaId
  	let update = req.body

  	Atleta.findByIdAndUpdate(atletaId, update, (err, atletaUpdated) => {
    	if (err) res.status(500).send({message: `Error al actualizar el atleta: ${err}`})

    	res.status(200).send({ atleta: atletaUpdated })
	})
}

function deleteAtleta(req, res){
	let atletaId = req.params.atletaId

  	Atleta.findById(atletaId, (err, atleta) => {
    if (err) res.status(500).send({message: `Error al borrar el atleta: ${err}`})
    	res.status(200).send({atleta: atleta})
    	console.log(err)
    	atleta.remove(err => {
      		if (err) res.status(500).send({message: `Error al borrar el atleta: ${err}`})
      		res.status(200).send({message: 'El atleta ha sido eliminado'})
    	})
	})
}

module.exports = {
	getAtletas,
	getAtleta,
	saveAtleta,
	updateAtleta,
	deleteAtleta
}