'use strict'
/* Clase: promo
 * Tablas en esquema: promocion
 * Tablas relacionadas: users, categorias
 * funcion: Manejo de promociones de los atletas
 * funciones de busquedas y creacion
 */
const Promo = require('../models/promo')
const User = require('../models/user')
const Cat = require('../models/categoria')

/* Obtener todas las promociones
 * @req datos de entrada
 * @res datos de respuesta
 */
function getPromos(req, res){
	Promo.find({}, (err, Promos) => {
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Promos) return res.status(404).send({message: 'No existen Promos'})

    	res.json(Promos )
	})
}

/* Obtener todas las promociones de un atleta
 * @req datos de entrada
 * @res datos de respuesta
 */
 function getPromosAtleta(req, res){
	Promo.findOne({atleta: req.params.AtletaId}, (err, Promos) => {
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Promos) return res.status(404).send({message: 'No existen Promos'})

    	res.json( Promos )
	})
}

/* Obtener una promocio dada
 * @req datos de entrada
 * @res datos de respuesta
 */
function getPromo(req, res){
	let PromoId = req.params.PromoId 	//id de la promocion

	Promo.findById(PromoId, (err, Promo) => { 
   		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Promo) return res.status(404).send({message: `El Promo no existe`})

    	res.json( Promo )
	})
}

/* Creacion de promocion
 * @req datos de creacion
 * @res datos de respuesta
 */
function savePromo(req, res){
	console.log('POST api/Promo')
	console.log(req.body)

	let promo = new Promo()
	promo.fechaPromo = req.body.fechaPromo 		//fecha de la promocion
	promo.atleta = req.body.atleta 				//id del atleta asociado
	promo.categoriaOld = req.body.categoriaOld  //categoria anterior del atleta
	promo.categoriaNew = req.body.categoriaNew  //categoria a la que es promovido
	promo.admin = req.body.admin 				//id del admin que promovio al atleta
	/*Validar que exista el atleta*/
	User.findOne({email: req.body.emailAtl}, (err, user) =>{
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!user) return res.status(404).send({message: `El atleta no existe`})
    	/*Valida que existe la categoria*/
    	Cat.findOne({nombre: req.body.categoriaNew}, (err, catg) =>{
    		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
	    	if (!catg) return res.status(404).send({message: `La categoria no existe`})
	    		var membresia = catg.tipo
	    		var precio = catg.precio 
	    		let update = req.body.categoriaNew
	    		/*Modifica la categoria del atleta*/
		    	User.findByIdAndUpdate(user._id, {$set: {nombreCtg: req.body.categoriaNew, nombreMbs: membresia, precioMbs: precio}}, (err, userUpdated) => {
				    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

					console.log(update)
				 })
    	})
    	
  	})
  	/*Registra la promocion*/
	promo.save((err,PromoStored) =>{
		if (err) res.status(500).send({message: `Error al guardar ${err}`})
		res.status(200).send({Promo: PromoStored})	
	})
}

module.exports = {
	getPromos,
	getPromosAtleta,
	getPromo,
	savePromo
}