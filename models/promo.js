'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const promoSchema = schema({
	fechaPromo: { type: Date, default: Date.now() }, 
	atleta: String,
	categoriaOld: String,
	categoriaNew: String,
	admin: String
})

module.exports = mongoose.model('promo', promoSchema);