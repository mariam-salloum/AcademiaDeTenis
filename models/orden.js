'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const ordenSchema = schema({
	producto: String,
	user: String,
	compra: String,
	estado: {type: String, enum:['Pendiente', 'Cancelado', 'Esperando Confirmacion'], default: 'Pendiente'}
})

module.exports = mongoose.model('orden', ordenSchema);