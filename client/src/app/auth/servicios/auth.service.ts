import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;
  rol: String;
  membresia: any;
  categoria: any;
  //email: String;

  constructor(private http:Http, public jwtHelper: JwtHelperService) { }

  // REGISTRAR - POST REQUESTS
  registrarUsuario(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(
      'http://localhost:8080/api/signup', 
      user, {headers: headers}).pipe(map(res => res.json()));
  }

  registrarMembresia(membresia) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('membresia registrada!');
    return this.http.post(
      'http://localhost:8080/api/membresia',
      membresia, {headers: headers}).pipe(map(res => res.json()));
  }

  registrarCategoria(categoria) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('categoria registrada!');
    return this.http.post(
      'http://localhost:8080/api/categoria',
      categoria, {headers: headers}).pipe(map(res => res.json()));
  }

  registrarTorneo(torneo) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('torneo registradox!');
    return this.http.post(
      'http://localhost:8080/api/torneo',
      torneo, {headers: headers}).pipe(map(res => res.json()));
  }

  agregarParticipante(participante) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('participante registrado!');
    return this.http.post(
      'http://localhost:8080/api/participante',
      participante, {headers: headers}).pipe(map(res => res.json()));
  }

  // ELIMINAR - DELETE REQUESTS
  eliminarUsuario(_id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('atleta eliminado!'+ _id);
    console.log('headers ', headers);
    return this.http.delete(
      'http://localhost:8080/api/user/'+ _id,
      {headers: headers}).pipe(map(res => res.json()));
  }

  eliminarMembresia(_id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('membresia eliminada!'+ _id);
    console.log('headers ', headers);
    return this.http.delete(
      'http://localhost:8080/api/membresia/'+ _id,
      {headers: headers}).pipe(map(res => res.json()));
  }

  eliminarCategoria(_id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('categoria eliminada!'+ _id);
    console.log('headers ', headers);
    return this.http.delete(
      'http://localhost:8080/api/categoria/'+ _id,
      {headers: headers}).pipe(map(res => res.json()));
  }

  eliminarTorneo(_id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    console.log('torneo eliminado!'+ _id);
    console.log('headers ', headers);
    return this.http.delete(
      'http://localhost:8080/api/torneo/'+ _id,
      {headers: headers}).pipe(map(res => res.json()));
  }

  // UPDATES
  modificarMembresia(_id,precio) {
    let headers = new Headers();
    this.loadToken();
    //headers.append('Authorization', "@earer " + this.authToken);
    console.log('membresia modificandose!' + _id);
    console.log('headers ', headers);
    return this.http.put(
      'http://localhost:8080/api/membresia/'+ _id, 
      precio, {headers: headers}).pipe(map(res => res.json()));
  }

  // Autenticar usuario a la hora de iniciar sesion
  autenticarUsuario(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(
      'http://localhost:8080/api/signin',
      user, {headers: headers}).pipe(map(res => res.json())
    ); 
  }

  usuarioAutenticado() {
    return this.authToken != null;
  }

  // Almacenar datos del usuario para luego utilizarlos
  almacenarDatosUsuario(token) {
    localStorage.setItem('id_token', token.token);
    localStorage.setItem('rol', token.type);
    // Se convierte a String para localStorage, luego cuando se devuelve se parsea a JSON
    // localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token.token;
    this.rol = token.type;
    // this.user = user;
  }

  // GET REQUEST
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', "@earer " + this.authToken);
    //headers.append('Content-Type','application/json');
    return this.http.get(
      'http://localhost:8080/api/perfil',
      {headers: headers}).pipe(map(res => res.json())
    );
  }

  getUsers() {
    return this.http.get(
      'http://localhost:8080/api/get'
    );
  }

  getMembresias() {
    return this.http.get(
      'http://localhost:8080/api/membresias'
    );
  }

  getMembresia(_id) {
    return this.http.get(
      'http://localhost:8080/api/membresia/'+_id
    );
  }

  getCategorias() {
    return this.http.get(
      'http://localhost:8080/api/categorias'
    );
  }

  getTorneos() {
    return this.http.get(
      'http://localhost:8080/api/torneos'
    );
  }

  getParticipantes(_id) {
    return this.http.get(
      'http://localhost:8080/api/participantes/'+_id
    );
  }
  // -----
  esAdministrador() {
    const rol = localStorage.getItem('rol');
    if(this.authToken != null && rol == 'admin') {
      //console.log('Es administrador!');
      return true;
    }
  }

  // Se busca el token en el local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // LogOut
  logout() {
    this.authToken = null;
    // this.user = null;
    localStorage.clear();
  }

  storage() {
    if (localStorage == null) {
      return true;
    }
  }
}
