import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http'; 

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Features
import { NavbarComponent } from './header/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { InicioComponent } from './secciones/inicio/inicio.component';
import { TorneosComponent } from './secciones/torneos/torneos.component';
import { MembrasiasComponent } from './secciones/membrasias/membrasias.component';
import { AtletasComponent } from './secciones/atletas/atletas.component';
import { PerfilComponent } from './secciones/perfil/perfil.component';

// Auth
import { AuthService } from './auth/servicios/auth.service';
import { ValidacionService } from './auth/servicios/validacion.service';
import { InfoComponent } from './secciones/info/info.component';

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
    MembrasiasComponent,
    AtletasComponent,
    PerfilComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080']
      }
    }) 
  ],
  providers: [ValidacionService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
