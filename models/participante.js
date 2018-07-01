'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const participanteSchema = schema({
	jugador: String,
	nombre: String,
	torneo: String,
	posicion: Number,
	ronda: Number,
	estado: {type: String, enum: ['Activo','Eliminado','Ganador'], default: 'Activo'}
})

module.exports = mongoose.model('participante', participanteSchema);