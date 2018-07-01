import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule } from '@angular/material';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// Features
import { NavbarComponent } from './header/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { InicioComponent } from './secciones/inicio/inicio.component';
import { TorneosComponent } from './secciones/torneos/torneos.component';
import { MembresiasComponent } from './secciones/membresias/membresias.component';
import { AtletasComponent } from './secciones/atletas/atletas.component';
import { PerfilComponent } from './secciones/perfil/perfil.component';
import { InfoComponent } from './secciones/info/info.component';
import { CrearMembresiaComponent } from './secciones/membresias/crear-membresia/crear-membresia.component';

// Auth
import { AuthService } from './auth/servicios/auth.service';
import { ValidacionService } from './auth/servicios/validacion.service';
import { CategoriasComponent } from './secciones/categorias/categorias.component';
import { CrearCategoriaComponent } from './secciones/categorias/crear-categoria/crear-categoria.component';
import { PagosComponent } from './secciones/pagos/pagos.component';
import { TiendaVirtualComponent } from './secciones/tienda-virtual/tienda-virtual.component';
import { EditarMembresiaComponent } from './secciones/membresias/editar-membresia/editar-membresia.component';
import { CrearTorneoComponent } from './secciones/torneos/crear-torneo/crear-torneo.component';
import { ParticipantesComponent } from './secciones/torneos/participantes/participantes.component';
import { AgregarParticipanteComponent } from './secciones/torneos/participantes/agregar-participante/agregar-participante.component';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrarComponent,
    InicioComponent,
    TorneosComponent,
    MembresiasComponent,
    AtletasComponent,
    PerfilComponent,
    InfoComponent,
    CrearMembresiaComponent,
    CategoriasComponent,
    CrearCategoriaComponent,
    PagosComponent,
    TiendaVirtualComponent,
    EditarMembresiaComponent,
    CrearTorneoComponent,
    ParticipantesComponent,
    AgregarParticipanteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080']
      }
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [ValidacionService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
