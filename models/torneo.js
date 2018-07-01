'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const torneoSchema = schema({
	nombre: String,
	fecha: String,
	hora: String,
	lugar: String,
	estado: {type: String, enum:['En juego', 'Espera', 'Finalizado'], default: 'Espera'}
})

module.exports = mongoose.model('torne', torneoSchema);