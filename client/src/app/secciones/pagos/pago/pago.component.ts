import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servicios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  id: String;
  pagos: any;

  constructor(private authService: AuthService, private activatedRouter: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.id);

    this.authService.getPagos(this.id).subscribe((pago: any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      console.log(pago);
      this.pagos = JSON.parse(pago._body);
      console.log(this.pagos);
    }, err => {
      console.log(err);
      return false;
    });
  }
}
