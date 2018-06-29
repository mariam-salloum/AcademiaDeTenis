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
  nombreAtl: String;
  apellidoAtl: String;
  cedulaAtl: String;
  fechaNacAtl: String;
  nombreCtg: String;
  email: String;
  password: String;
  telefonoAtl: String;

  categorias: any;

  // Los servicios se inyectan en el constructor
  constructor(
    private validacion: ValidacionService,
    private authService: AuthService,
    private router:Router) {}

  ngOnInit() {
    this.authService.getCategorias().subscribe((categoria:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log(categoria);
      this.categorias = JSON.parse(categoria._body);
      console.log(this.categorias);
    }, err => {
        console.log(err);
        return false;
    });
  }

  onRegisterSubmit() {
    const user = {
      nombreAtl: this.nombreAtl,
      apellidoAtl: this.apellidoAtl,
      cedulaAtl: this.cedulaAtl,
      fechaNacAtl: this.fechaNacAtl,
      nombreCtg: this.categorias.nombre,
      email: this.email,
      password: this.password,
      telefonoAtl: this.telefonoAtl 
    }

    // Campos requeridos
    if(!this.validacion.validarRegistro(user)) {
      console.log('Please fill in all Fields');
      return false;
    } else if(!this.validacion.validarCedula(user.cedulaAtl)) {
      console.log('Cedula venezolana');
    } else if(!this.validacion.validarFecha(user.fechaNacAtl)) {
      console.log('El formato es dd/mm/aa')
    } else if(!this.validacion.validarEmail(user.email)) {
      console.log('por favor, coloque un email valido')
    } else if(!this.validacion.validarTelefono(user.telefonoAtl)) {
      console.log('por favor, coloque un telefono valido xxx xxx xxxx');
    } else 
      this.authService.registrarUsuario(user).subscribe(data => {
        console.log(data);
      if(data) {
        console.log('Ya estas registrado!');
        this.router.navigate(['/atletas']);
      } else {
        console.log('Algo salio mal');
        this.router.navigate(['/registrar']);
      }
    });
  }
}
