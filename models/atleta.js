'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const atletaSchema = schema({
	nombre: String,
	apellido: String,
	cedula: Number,
	nacionalidad: String,
	fechaNacimiento: Date,
	sexo: {type: String, enum:['masculino','femenino']},
	fechaIngreso: Date,
	nombreRepre: String 
})

module.exports = mongoose.model('atleta', atletaSchema);