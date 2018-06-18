import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidacionService {

  constructor() { }

  validarRegistro(user) {
    if (user.nombre == 0 || user.nombre == undefined || 
        user.apellido == 0 || user.apellido == undefined ||
        user.cedula == 0 || user.cedula == undefined ||
        user.f_nacimiento == 0 || user.f_nacimiento == undefined ||
        user.email == 0 || user.email == undefined ||
        user.password == 0 || user.password == undefined ||
        user.telefono == 0 || user.telefono == undefined ) {
          console.log('FALSE');
          return false;
       } else {
          console.log('TRUE');
          return true;
       }
  }
 
  validarCedula(cedula) {
    const re = /(\d*[0-9]{2})/;
    return re.test(cedula);
  }

  validarFecha(f_nacimiento) {
    const re = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    return re.test(f_nacimiento);
  }

  validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validarTelefono(telefono) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(telefono);
  }
}
