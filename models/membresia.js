'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const membresiaSchema = schema({
	tipo: { type: String, unique: true},
	precio: Number, 
	update_by: String 
})
 
module.exports = mongoose.model('membresia', membresiaSchema);