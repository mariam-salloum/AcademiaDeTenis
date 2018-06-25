'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const pagoSchema = schema({
	estado: {type: String, enum:['Al dia', 'Moroso', 'Esperando confirmacion']},
	fechaPago: { type: Date, default: Date.now() }, 
	atleta:  String,
	codigo : /*{type:*/ Number,/*, unique: true}*/
	admin: String
})

module.exports = mongoose.model('pago', pagoSchema);