import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidacionService {

  constructor() { }

  validarRegistro(user) {
    if (user.nombreAtl == 0 || user.nombreAtl == undefined || 
        user.apellidoAtl == 0 || user.apellidoAtl == undefined ||
        user.cedulaAtl == 0 || user.cedulaAtl == undefined ||
        user.fechaNacAtl == 0 || user.fechaNacAtl == undefined ||
        user.email == 0 || user.email == undefined ||
        user.password == 0 || user.password == undefined ||
        user.telefonoAtl == 0 || user.telefonoAtl == undefined ) {
          console.log('FALSE');
          return false;
       } else {
          console.log('TRUE');
          return true;
       }
  }
 
  validarCedula(cedulaAtl) {
    const re = /(\d*[0-9]{2})/;
    return re.test(cedulaAtl);
  }

  validarFecha(fechaNacAtl) {
    const re = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    return re.test(fechaNacAtl);
  }

  validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validarTelefono(telefonoAtl) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(telefonoAtl);
  }
}
