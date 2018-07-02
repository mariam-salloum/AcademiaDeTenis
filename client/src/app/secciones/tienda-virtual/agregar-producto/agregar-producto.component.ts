import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  nombre: String;
  descripcion: String;
  cantidad: Number;
  tipo: String;
  precio: Number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onAddProducto() {
    const producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      cantidad: this.cantidad,
      tipo: this.tipo,
      precio: this.precio
    }

    this.authService.agregarProducto(producto).subscribe(data => {
      console.log(data); 
      
      if(data) {
        console.log('Ya se registró el producto!');
        this.router.navigate(['/tienda-virtual']);
      }
    });
  }

}
