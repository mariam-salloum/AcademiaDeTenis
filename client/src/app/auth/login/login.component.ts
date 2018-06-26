import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.autenticarUsuario(user).subscribe((data:any) => {
      console.log(user); 
      if(data) {
        this.authService.almacenarDatosUsuario(data);
        this.router.navigate(['/']);
      } else {
        console.log(data.msg);
        this.router.navigate(['/login']);
      }
    });
  }
}
