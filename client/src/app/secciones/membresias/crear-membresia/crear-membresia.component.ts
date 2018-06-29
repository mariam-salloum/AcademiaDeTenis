import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-membresia',
  templateUrl: './crear-membresia.component.html',
  styleUrls: ['./crear-membresia.component.css']
})
export class CrearMembresiaComponent implements OnInit {
  tipo: String;
  precio: Number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterMembresiaSubmit() {
    const membresia = {
      tipo: this.tipo,
      precio: this.precio
    }

    this.authService.registrarMembresia(membresia).subscribe(data => {
      console.log(data); 
      
      if(data) {
        console.log('Ya se registró la membrasía!');
        this.router.navigate(['/membresias']);
      }
    });
  }
}
