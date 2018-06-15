'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err,res) =>{
	if (err) { 
		console.log(`error en conexion a la bd: $:{err}`)
	}
	console.log('Conexion a la bd establecida')

	app.listen(config.port, () =>{
		console.log(`Escuchando en http:://localhost:${config.port}`)
	})
})
