import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servicios/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {
  id: String;
  participantes: any;

  constructor(private authService: AuthService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.id);

    this.authService.getParticipantes(this.id).subscribe((participante:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log(participante);
      this.participantes = JSON.parse(participante._body);
      console.log(this.participantes);
    }, err => {
        console.log(err);
        return false;
    });
  }

  eliminar(idParticipante) {
    for(let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].idParticipante === idParticipante) {
        this.participantes.splice(i, 1);
      }
    }
    this.authService.eliminarParticipante(this.id, idParticipante).subscribe((res) => {
      console.log('participantee eliminadoooo');
    });
  }
}
