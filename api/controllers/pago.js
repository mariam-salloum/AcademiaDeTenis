'use strict'
/* Clase: pago
 * Tablas en esquema: pago
 * Tablas relacionadas: users, membresia
 * funcion: Manejo de los pagos de los atletas
 * funciones de busquedas, creacion, modificado y eliminado
 */
const Pago = require('../models/pago')
const User = require('../models/user')

/* Obtener todas los pagos
 * @req datos de entrada
 * @res datos de respuesta
 */
function getPagos(req, res){
	Pago.find({}, (err, Pagos) => {
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Pagos) return res.status(404).send({message: 'No existen Pagos'})

    	res.send(200, { Pagos })
	})
}

/* Obtener todas los pagos de un usuario
 * @req datos de entrada
 * @res datos de respuesta
 */
function getPagosAtleta(req, res){
	Pago.find({atleta: req.params.AtletaId}, (err, Pagos) => {
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Pagos) return res.status(404).send({message: 'No existen Pagos'})

    	res.send(200, { Pagos })
	})
}

/* Obtener un pago por su id
 * @req datos de entrada
 * @res datos de respuesta
 */
function getPago(req, res){
	let PagoId = req.params.PagoId 	//id del pago

	Pago.findById(PagoId, (err, Pago) => {
   		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Pago) return res.status(404).send({message: `El Pago no existe`})

    	res.status(200).send({ Pago })
	})
}

/* Creacion de un pago
 * @req datos de creacion
 * @res datos de respuesta
 */
function savePago(req, res){
	console.log('POST api/Pago')
	console.log(req.body)

	/*Valida que pueda pagar*/
	User.findOne({_id: req.body.atleta}, (err, usuario) =>{
		console.log(usuario)
		if(usuario.estadoCta !=  "Moroso" ){
          res.status(400).send({message: 'El atleta no puede realizar el pago'})
        }else{
        	let pago = new Pago()
			pago.estado = "Esperando confirmacion" 		//Estado del pago
			pago.fechaPago = req.body.fechaPago 		//Fecha del pago
			pago.atleta = req.body.atleta 				//id del atleta
			pago.codigo = req.body.codigo 				//codigo de transferencia

			/*Agregar a tabla user*/
			User.findOne({_id: req.body.atleta}, (err, user) =>{
		    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		    	if (!user) return res.status(404).send({message: `El atleta no existe`})
		    	let update = req.body.estado
		    	User.findByIdAndUpdate(user._id, {$set: {estadoCta: req.body.estado}}, (err, userUpdated) => {
				    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

					console.log(update)
			 	})
		    	pago.save((err,PagoStored) =>{
					if (err) res.status(500).send({message: `Error al guardar ${err}`})
					res.status(200).send({Pago: PagoStored})	
				})
  			})
        }
	})
}

/* Modificacion de un de un pago para confirmacion 
 * @req datos de entrada (id del pago, contenido a modificar)
 * @res datos de respuesta
 */
function updatePago(req, res){
	let PagoId = req.params.PagoId
  	let update = req.body

  	User.findOne({_id: req.body.atleta}, (err, user) =>{
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!user) return res.status(404).send({message: `El atleta no existe`})
    	let update = req.body.estado
    	/*Modifica el usuario*/
    	User.findByIdAndUpdate(user._id, {$set: {estadoCta: req.body.estado}}, (err, userUpdated) => {
		    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

			console.log(update)
		 })
  	})
  	/*Modifica el registro del pago*/
  	Pago.findByIdAndUpdate(PagoId, update, (err, PagoUpdated) => {
    	if (err) res.status(500).send({message: `Error al actualizar el Pago: ${err}`})

    	res.status(200).send({ Pago: PagoUpdated })
	})
}

/* Eliminar un pago dado
 * @req datos de entrada (id del pago)
 * @res datos de respuesta
 */
function deletePago(req, res){
	let PagoId = req.params.PagoId

  	Pago.findById(PagoId, (err, Pago) => {
    if (err) res.status(500).send({message: `Error al borrar el Pago: ${err}`})
    	res.status(200).send({Pago: Pago})
    	console.log(err)
    	/*Modifica al usuario*/
   		User.findByIdAndUpdate(Pago.atleta, {$set: {estadoCta: "Moroso"}}, (err, userUpdated)=>{
   			console.log(userUpdated)
   		})
   		/*Elimina el pago*/
    	Pago.remove(err => {
      		if (err) res.status(500).send({message: `Error al borrar el Pago: ${err}`})
      		res.status(200).send({message: 'El Pago ha sido eliminado'})
    	})
	})
}

module.exports = {
	getPagos,
	getPagosAtleta,
	getPago,
	savePago,
	updatePago,
	deletePago
}