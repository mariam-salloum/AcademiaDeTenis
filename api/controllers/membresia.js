'use strict'
/* Clase: membresia
 * Tablas en esquema: membresia
 * Tablas relacionadas: categoria, atleta
 * funcion: Manejo de membresias
 * funciones de busquedas, creado, modificacion y eliminado
 */
const Membresia = require('../models/membresia')
const User = require('../models/user')
const Categoria = require('../models/categoria')

/* Obtener todas las membresias
 * @req datos de entrada
 * @res datos de respuesta
 */
function getMembresias(req, res){
	Membresia.find({}, (err, Membresias) => {
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Membresias) return res.status(404).send({message: 'No existen Membresias'})

    	res.send(200, { Membresias })
	})
}

/* Obteniene una membresia dado su ID
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getMembresia(req, res){
	let MembresiaId = req.params.MembresiaId

	Membresia.findById(MembresiaId, (err, Membresia) => {
   		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Membresia) return res.status(404).send({message: `El Membresia no existe`})

    	res.status(200).send({ Membresia })
	})
}

/* Creacion de membresia 
 * @req datos de creacion
 * @res datos de respuesta
 */
function saveMembresia(req, res){
	console.log('POST api/Membresia')
	console.log(req.body)
  console.log(req.user.sub)
  var aux = req.user.sub

	let membresia = new Membresia()    //crea el nuevo objeto
	membresia.tipo = req.body.tipo     //asigna el tipo con lo leido
	membresia.precio = req.body.precio //asigna el precio con lo leido
  membresia.update_by = aux          //asigna el id del administrador que lo creo
	
	membresia.save((err,MembresiaStored) =>{
		if (err) res.status(500).send({message: `Error al guardar ${err}`})
		res.status(200).send({Membresia: MembresiaStored})	
	})
}

/* Modificacion de una membresia
 * @req datos de entrada (id de la membresia, contenido a modificar)
 * @res datos de respuesta
 */
function updateMembresia(req, res){
	let MembresiaId = req.params.MembresiaId
  let update = req.body
    //Modifica los atletas con su antiguo nombre
  	Membresia.findById(MembresiaId, (err, Membresia) => {
  		console.log(Membresia)
  		User.find({nombreMbs: Membresia.tipo}, (err,usuario) =>{
  			for (var i = usuario.length - 1; i >= 0; i--) {
  				User.findByIdAndUpdate(usuario[i]._id, {$set: {nombreMbs: req.body.tipo, precioMbs: req.body.precio}}, (err,userUpdated)=>{
  					console.log(userUpdated)
  				})
  			}
  		})
      //Modifica las categorias de dicha membresia
  		Categoria.find({tipo: Membresia.tipo}, (err,categoria)=>{
  			for (var i = categoria.length - 1; i >= 0; i--) {
  				Categoria.findByIdAndUpdate(categoria[i]._id, {$set: {tipo: req.body.tipo, precio: req.body.precio}}, (err,userUpdated)=>{
  					console.log(userUpdated)
  				})
  			}	
  		})
  	})
    //Modifica la membresia
  	Membresia.findByIdAndUpdate(MembresiaId, update, (err, MembresiaUpdated) => {
    	if (err) res.status(500).send({message: `Error al actualizar el Membresia: ${err}`})

    	res.status(200).send({ Membresia: MembresiaUpdated })
	})
}

/* Eliminar una membresia dada
 * @req datos de entrada (id de la membresia)
 * @res datos de respuesta
 */
function deleteMembresia(req, res){
	let MembresiaId = req.params.MembresiaId

  	Membresia.findById(MembresiaId, (err, Membresia) => {
      User.find({nombreMbs: Membresia.tipo}, (err,usuario) =>{
        if(usuario.length > -1){
          res.status(400).send({message: 'No se puede eliminar membresia asociada a usuarios'})
          return null
        }
      })
      Categoria.find({tipo: Membresia.tipo}, (err,categoria)=>{
        if(categoria.length > -1){
          res.status(400).send({message: 'No se puede eliminar membresia asociada a categorias'})
          return null
        }
      })
    if (err) res.status(500).send({message: `Error al borrar el Membresia: ${err}`})
    	Membresia.remove(err => {
      		if (err) res.status(500).send({message: `Error al borrar el Membresia: ${err}`})
      		res.status(200).send({message: 'El Membresia ha sido eliminado'})
    	})
	})
}

module.exports = {
	getMembresias,
	getMembresia,
	saveMembresia,
	updateMembresia,
	deleteMembresia
}