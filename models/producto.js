'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const productoSchema = schema({
	nombre: { type: String, unique: true}, 
	precio: Number,
	descripcion: String,
	cantidad: {type: Number, default: 0},
	tipo: String
})

module.exports = mongoose.model('producto', productoSchema);