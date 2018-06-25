'use strict'

function trimUser(user){
  var text = user
    text = text.replace("<sub>","")
    text = text.replace("</sub>","")
  return text
}
module.exports = {
  trimUser
}