import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/servicios/auth.service';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent implements OnInit {
  membresias: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getMembresias().subscribe((membresia:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log(membresia);
      this.membresias = JSON.parse(membresia._body);
      console.log(this.membresias);
    }, err => {
        console.log(err);
        return false;
    });
  }

  editar(_id) {
    this.authService.modificarMembresia(_id).subscribe((res) => {
      console.log('membresia modificandose');
    });
  }

  eliminar(_id) {
    for(let i = 0; i < this.membresias.length; i++) {
      if (this.membresias[i]._id === _id) {
          this.membresias.splice(i, 1);
      }
    }
    this.authService.eliminarMembresia(_id).subscribe((res) => {
      console.log('membresia eliminadaaa');
    });
  }
}
