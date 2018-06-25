'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const express = require('express');
const path = require('path');
mongoose.Promise = global.Promise;

mongoose.connect(config.db, (err,res) =>{
	if (err) { 
		console.log(`error en conexion a la bd: $:{err}`)
	}
	console.log('Conexion a la bd establecida')

	app.listen(config.port, () =>{
		console.log(`Escuchando en http:://localhost:${config.port}`)
	})
})

app.use(express.static(__dirname + '/client/dist/client/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});
