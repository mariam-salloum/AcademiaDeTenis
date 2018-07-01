import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servicios/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editar-membresia',
  templateUrl: './editar-membresia.component.html',
  styleUrls: ['./editar-membresia.component.css']
})
export class EditarMembresiaComponent implements OnInit {
  membresias: any;
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let _id = + params['_id'];
      console.log(params['_id']);
      this.authService.getMembresia(params['_id']).subscribe(data =>{
        console.log(data)
      })
       // (+) converts string 'id' to a number
    //  this.authService.getMembresia(_id);
    });
    
  }

  onEditMembresia(_id, precio) {
    const membresia = {
      tipo: this.membresias.tipo,
      precio: this.membresias.precio,

    }
    this.authService.modificarMembresia(_id, precio).subscribe(data => {
      console.log(data); 
      if(data) {
        console.log('cambio realizado!');
        this.router.navigate(['/membresias']);
      }
    }); 
  }
}
