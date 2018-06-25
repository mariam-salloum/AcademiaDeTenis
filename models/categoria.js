'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const categoriaSchema = schema({
	nombre: { type: String, unique: true},
	tipo: String,
	precio: Number,
	update_by: String 
})

module.exports = mongoose.model('categoria', categoriaSchema);