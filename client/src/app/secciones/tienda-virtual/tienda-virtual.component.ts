import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/servicios/auth.service';

@Component({
  selector: 'app-tienda-virtual',
  templateUrl: './tienda-virtual.component.html',
  styleUrls: ['./tienda-virtual.component.css']
})
export class TiendaVirtualComponent implements OnInit {
  productos: any;
  producto: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProductos().subscribe((producto:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log(producto);
      this.productos = JSON.parse(producto._body);
      console.log(this.productos);
    }, err => {
        console.log(err);
        return false;
    });
  }

  editar(_id) {
    this.authService.getProducto(_id).subscribe(data => {
      //console.log(res);
      console.log(data);
    });
  }

  eliminar(_id) {
    for(let i = 0; i < this.productos.length; i++) {
      if (this.productos[i]._id === _id) {
          this.productos.splice(i, 1);
      }
    }
    this.authService.eliminarProducto(_id).subscribe((res) => {
      console.log('producto eliminadooo');
    });
  }
}
