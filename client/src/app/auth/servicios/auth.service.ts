import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegistrarComponent } from '../registrar/registrar.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;
  //email: String;

  constructor(private http:Http, public jwtHelper: JwtHelperService) { }

  // post request a la base de datos
  registrarUsuario(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(
      'http://localhost:8080/api/signup', 
      user, {headers: headers}).pipe(map(res => res.json())
    );
  }

  autenticarUsuario(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(
      'http://localhost:8080/api/signin',
      user, {headers: headers}).pipe(map(res => res.json())
    );
    
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(
      'http://localhost:8080/api/perfil',
      {headers: headers}).pipe(map(res => res.json())
    );
  }

  almacenarDatosUsuario(token) {
    localStorage.setItem('id_token', token);
    // Se convierte a String para localStorage, luego cuando se devuelve se parsea a JSON
    // localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    // this.user = user;
  }

  // Se busca el token en el local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  usuarioAutenticado() {
    return this.authToken != null;
  }

/*   esAdministrador() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(this.authToken != null && user.email == "admin@academiadetenis.com") {
      console.log('Es Administrador!');
      return true;
    } else {
      return false;
    }
  } */

  // LogOut
  logout() {
    this.authToken = null;
    // this.user = null;
    localStorage.clear();
  }
}
