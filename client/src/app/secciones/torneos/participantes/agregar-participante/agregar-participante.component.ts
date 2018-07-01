import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-participante',
  templateUrl: './agregar-participante.component.html',
  styleUrls: ['./agregar-participante.component.css']
})
export class AgregarParticipanteComponent implements OnInit {
  users: any;
  torneo: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((user:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log(user);
      this.users = JSON.parse(user._body);
      console.log(this.users);
    }, err => {
        console.log(err);
        return false;
    });
  }

  onAddParticipante() {
    const participante = {
      jugador: this.users._id,
      nombre: this.users.nombreAtl,
      torneo: this.torneo
    }

    this.authService.agregarParticipante(participante).subscribe(data => {
      console.log(data); 

      if(data) {
        console.log('Se ha agregado el particpante!');
        this.router.navigate(['/participantes']);
      }
    }); 
  }
}
