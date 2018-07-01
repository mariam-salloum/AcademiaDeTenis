import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-torneo',
  templateUrl: './crear-torneo.component.html',
  styleUrls: ['./crear-torneo.component.css']
})
export class CrearTorneoComponent implements OnInit {
  nombre: String;
	fecha: Date;
	hora: String;
  lugar: String;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterTorneoSubmit() {
    const torneo = {
      nombre: this.nombre,
      fecha: this.fecha,
      hora: this.hora,
      lugar: this.lugar
    }
  
    this.authService.registrarTorneo(torneo).subscribe(data => {
      console.log(data); 
      
      if(data) {
        console.log('Ya se registró el torneo!');
        this.router.navigate(['/torneos']);
      }
    });
  }
}

