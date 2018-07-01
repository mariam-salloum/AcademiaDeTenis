import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {
  torneos: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getTorneos().subscribe((torneo:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log(torneo);
      this.torneos = JSON.parse(torneo._body);
      console.log(this.torneos);
    }, err => {
        console.log(err);
        return false;
    });
  }

  eliminar(_id) {
    for(let i = 0; i < this.torneos.length; i++) {
      if (this.torneos[i]._id === _id) {
        this.torneos.splice(i, 1);
      }
    }
    this.authService.eliminarTorneo(_id).subscribe((res) => {
      console.log('torneo eliminadoooo');
    });
  }
}
