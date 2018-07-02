import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  nombre: String;
  tipo: String;
  precio: Number;
  membresias: any;
  membresia: any;

  constructor(private authService: AuthService, private router: Router) { }

  // Al momento de cargar la pagina, se traen todas las membresias que existen en la academia
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

  onRegisterCategoriaSubmit() {
    const categoria = {
      nombre: this.nombre,
      tipo: this.membresia.tipo,
      precio: this.membresia.precio,
      membresia: this.membresia
    }
    
    this.authService.registrarCategoria(categoria).subscribe(data => {
      console.log(data); 
      if(data) {
        console.log('Ya se registro la categoria!');
        this.router.navigate(['/categorias']);
      }
    }); 
  }

}
