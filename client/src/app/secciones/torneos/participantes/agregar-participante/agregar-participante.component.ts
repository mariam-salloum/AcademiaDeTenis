import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/servicios/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-participante',
  templateUrl: './agregar-participante.component.html',
  styleUrls: ['./agregar-participante.component.css']
})
export class AgregarParticipanteComponent implements OnInit {
  users: any;
  user: any;
  torneo: String;
  id: String;
  nombre: String;

  constructor(private authService: AuthService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.id);

    this.authService.getUsers().subscribe((user:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log("Usuarios"+user);
      this.users = JSON.parse(user._body);
      console.log(this.users);
    }, err => {
        console.log(err);
        return false;
    });
  }

  onAddParticipante() {
    const participante = {
      nombre: this.user.nombreAtl +" "+ this.user.apellidoAtl,
      jugador: this.user._id,
      torneo: this.id
    }

    console.log("VIVA "+participante.nombre + " / "+ participante.jugador + " / " + participante.torneo)
    console.log("GGGG"+this.user.nombreAtl)
    this.authService.agregarParticipante(participante).subscribe(data => {
      console.log("dataaa: ", data); 

      if(data) {
        console.log('Se ha agregado el particpante!');
        this.router.navigate(['/participantes/' + this.id]);
      }
    }); 
  }
}
