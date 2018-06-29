import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  users: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((atletas:any) => {
      // .body es String, por eso lo parseamos para ser convertido en array
      this.users = JSON.parse(atletas._body);
      console.log(this.users);
    }, err => {
        console.log(err);
        return false;
    });
  }

  editar() {

  }
  
  eliminar(_id) {
    for(let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === _id) {
          this.users.splice(i, 1);
      }
    }
    this.authService.eliminarUsuario(_id).subscribe((res) => {
      console.log('User eliminadooooo');
    });
  }
}
