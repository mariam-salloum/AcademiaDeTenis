import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { ValidacionService } from '../servicios/validacion.service';
import { Router } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {
  nombre: String;
  apellido: String;
  cedula: String;
  f_nacimiento: String;
  email: String;
  password: String;
  telefono: String;

  // Los servicios se inyectan en el constructor
  constructor(
    private validacion: ValidacionService,
    private authService: AuthService,
    private router:Router) {}

  ngOnInit() {
  
  }

  onRegisterSubmit() {
    const user = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula: this.cedula,
      f_nacimiento: this.f_nacimiento, 
      email: this.email,
      password: this.password,
      telefono: this.telefono 
    }

    // Campos requeridos
    if(!this.validacion.validarRegistro(user)) {
      console.log('Please fill in all Fields');
      return false;
    } else if(!this.validacion.validarCedula(user.cedula)) {
      console.log('Cedula venezolana');
    } else if(!this.validacion.validarFecha(user.f_nacimiento)) {
      console.log('El formato es dd/mm/aa')
    } else if(!this.validacion.validarEmail(user.email)) {
      console.log('por favor, coloque un email valido')
    } else if(!this.validacion.validarTelefono(user.telefono)) {
      console.log('por favor, coloque un telefono valido xxx xxx xxxx');
    } else 
      this.authService.registrarUsuario(user).subscribe(data => {
        console.log(data);
      if(data) {
        console.log('Ya estas registrado!');
        this.router.navigate(['/login']);
      } else {
        console.log('Algo salio mal');
        this.router.navigate(['/registrar']);
      }
    });
  }
}
