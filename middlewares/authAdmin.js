'use strict'

const services = require('../services')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]
  services.decodeToken(token)
    .then(response => {
      req.user = response
      if(response.typ == "admin"){
        next()
      }
      else{
        res.status(response.status).send({message: "no esta autorizado"})  
      }
    })
    .catch(response => {
      res.status(response.status).send({message: response.message})﻿
    })
}

module.exports = isAuth