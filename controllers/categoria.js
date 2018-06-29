'use strict'
/* Clase: categoria
 * Tablas en esquema: categoria
 * Tablas relacionadas: promo, users
 * funcion: Manejo de categorias
 * funciones de busquedas, creacion, modificacion y eliminado
 */
const Categoria = require('../models/categoria')
const User = require('../models/user')
const Promo = require('../models/promo')

/* Obtener todas las categorias
 * @req datos de entrada
 * @res datos de respuesta
 */
function getCategorias(req, res){
	Categoria.find({}, (err, Categorias) => {
    	if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Categorias) return res.status(404).send({message: 'No existen Categorias'})

    	res.json(Categorias)
	}) 
}

/* Obteniene una categoria dada su ID
 * @req datos de entrada (id)
 * @res datos de respuesta
 */
function getCategoria(req, res){
	let CategoriaId = req.params.CategoriaId //id de la categoria a buscar

	Categoria.findById(CategoriaId, (err, Categoria) => {
   		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    	if (!Categoria) return res.status(404).send({message: `El Categoria no existe`})

    	res.json(Categoria)
	})
}

/* Creacion de categoria 
 * @req datos de creacion
 * @res datos de respuesta
 */
function saveCategoria(req, res){
	console.log('POST api/Categoria')
	console.log(req.body)
  var aux = req.user.sub

	let categoria = new Categoria()
	categoria.nombre = req.body.nombre   //nombre de la categoria
	categoria.tipo = req.body.tipo       //nombre de la membresia asociada
	categoria.precio = req.body.precio   //precio de la membresia asociada
  categoria.update_by = aux            //asigna el id del administrador que lo creo
	
	categoria.save((err,CategoriaStored) =>{
		if (err) res.status(500).send({message: `Error al guardar ${err}`})
		res.status(200).send({Categoria: CategoriaStored})	
	})
}

/* Modificacion de una categoria
 * @req datos de entrada (id de la categoria, contenido a modificar)
 * @res datos de respuesta
 */
function updateCategoria(req, res){
	let CategoriaId = req.params.CategoriaId   //id de la categoria a buscar
  let update = req.body                      //data a modificar
  //Busca la categoria
  	Categoria.findById(CategoriaId, (err, Categoria) => {
      /*Modifica el nombre de la categoria en los usuarios asociados*/
  		User.find({nombreCtg: Categoria.nombre}, (err,usuario) =>{
  			for (var i = usuario.length - 1; i >= 0; i--) {
  				User.findByIdAndUpdate(usuario[i]._id, {$set: {nombreCtg: req.body.nombre}}, (err,userUpdated)=>{
  					console.log(userUpdated)
  				})
  			}
  		})
      /*Modifica el nombre de la categoria en las promociones asociadas*/
  		Promo.find({categoriaNew: Categoria.nombre}, (err, promo) =>{
  			for (var i = promo.length - 1; i >= 0; i--) {
  				Promo.findByIdAndUpdate(promo[i]._id, {$set: {categoriaNew: req.body.nombre}}, (err,userUpdated)=>{
  					console.log(userUpdated)
  				})
  			}
  		})
      /*Modifica el nombre de la categoria en las promociones asociadas*/
  		Promo.find({categoriaOld: Categoria.nombre}, (err, promo) =>{
  			for (var i = promo.length - 1; i >= 0; i--) {
  				Promo.findByIdAndUpdate(promo[i]._id, {$set: {categoriaOld: req.body.nombre}}, (err,userUpdated)=>{
  					console.log(userUpdated)
  				})
  			}
  		})
  	})
    /*Modifica la informacion de la categoria*/
  	Categoria.findByIdAndUpdate(CategoriaId, update, (err, CategoriaUpdated) => {//modificar a que solo sea el nombre
    	if (err) res.status(500).send({message: `Error al actualizar el Categoria: ${err}`})

    	res.json({ Categoria: CategoriaUpdated })
	})
}

/* Eliminar una categoria dada
 * @req datos de entrada (id de la membresia)
 * @res datos de respuesta
 */
function deleteCategoria(req, res){
	let CategoriaId = req.params.CategoriaId
    /*Busca la categoria por su id*/
  	Categoria.findById(CategoriaId, (err, Categoria) => {
      /*Verifica que no este asociada a un usuario*/
      User.find({nombreCtg: Categoria.nombre}, (err,usuario) =>{
        if(usuario.length > -1){
          return
        }
      })
      /*Verifica que no este asociado a una promocion como categoria anterior*/
      Promo.find({categoriaOld: Categoria.nombre}, (err,usuario) =>{
        if(usuario.length > -1){
          return
        }
      })
      /*Verifica que no este asociado a una promocion como categoria nueva*/
      Promo.find({categoriaNew: Categoria.nombre}, (err,usuario) =>{
        if(usuario.length > -1){
          return 
        }
      })
    /*Elimina la categoria*/  
    if (err) res.status(500).send({message: `Error al borrar el Categoria: ${err}`})
    	//res.status(200).send({Categoria: Categoria})
    	console.log(err)
    	Categoria.remove(err => {
      		if (err) res.status(500).send({message: `Error al borrar el Categoria: ${err}`})
      		res.status(200).send({message: 'El Categoria ha sido eliminado'})
    	})
	})
}

module.exports = {
	getCategorias,
	getCategoria,
	saveCategoria,
	updateCategoria,
	deleteCategoria
}