import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/servicios/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  id: any;
  precio: Number;
  cantidad: Number;

  constructor(private authService: AuthService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  onEditProducto(precio, cantidad) {
    const producto = {
      precio: this.precio,
      cantidad: this.cantidad
    }
    
    console.log(producto)
    this.authService.modificarProducto(this.id, producto).subscribe(data => {
      console.log(data); 
      if(data) {
        console.log('cambio realizado!');
        this.router.navigate(['/tienda-virtual']);
      }
    });  
  }
}
