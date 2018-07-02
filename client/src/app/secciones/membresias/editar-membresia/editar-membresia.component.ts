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
  id: any;
  precio: any;

  constructor(private authService: AuthService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.id);

    /* this.route.params.forEach((params: Params) => {
      let _id = + params['_id'];
      console.log(params['_id']);
      this.authService.getMembresia(params['_id']).subscribe(data =>{
        console.log(data)
      }) */
       // (+) converts string 'id' to a number
    //  this.authService.getMembresia(_id);
    }
    

   onEditMembresia(precio) {
    const membresia = {
      precio: this.precio,
    }
    
    console.log(membresia)
    this.authService.modificarMembresia(this.id, membresia).subscribe(data => {
      console.log(data); 
      if(data) {
        console.log('cambio realizado!');
        this.router.navigate(['/membresias']);
      }
    });  
  } 
}
