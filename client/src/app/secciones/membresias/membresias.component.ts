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
  precio: Number;
  membresia: any;

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
    this.authService.getMembresia(_id).subscribe(data => {
      //console.log(res);
      console.log(data);
      console.log(this.membresias.precio);
    });
  }

  guardarCambios(_id, precio) {
    console.log(precio)
/*     this.authService.modificarMembresia(_id).subscribe((precioM) => {
      /* console.log(precio);
      precioM = precio;
      console.log(precioM);
      return precioM; 
    }) */
    /* this.authService.modificarMembresia(_id).subscribe((res) => {
      console.log(res);
      console.log("membresia selec: ", _id);
      console.log("viejo:", precio);
      this.membresias.precio = precio;
      console.log("nuevo: ", this.membresias.precio);
    }); */
    
    this.membresias.precio = precio;
    console.log(this.membresias.precio);

    this.authService.modificarMembresia(_id, precio).subscribe((res) => {
      console.log("holis");
    })
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
