'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const compraSchema = schema({
	fecha: Date,
	user: String,
	total: Number,
	codigo: Number,
	estado: {type: String, enum:['Pendiente', 'Cancelado', 'Esperando Confirmacion'], default: 'Pendiente'}
})

module.exports = mongoose.model('compra', compraSchema);