import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any;

  constructor(private authService: AuthService, private router: Router) { }

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

  editar() {

  }
  
  eliminar(_id) {
    for(let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i]._id === _id) {
          this.categorias.splice(i, 1);
      }
    }
    this.authService.eliminarCategoria(_id).subscribe((res) => {
      console.log('categoria eliminadaaa');
    });
  }
}
