import { RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { AuthGuard } from './auth/guards/auth.guard';

// Features
import { InicioComponent } from '../app/secciones/inicio/inicio.component';
import { TorneosComponent } from './secciones/torneos/torneos.component';
import { MembrasiasComponent } from './secciones/membrasias/membrasias.component';
import { AtletasComponent } from './secciones/atletas/atletas.component';
import { PerfilComponent } from './secciones/perfil/perfil.component';
import { InfoComponent } from './secciones/info/info.component';

const appRoutes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegistrarComponent/*, canActivate:[AuthGuard]*/},
    { path: 'academiadetenis_info', component: InfoComponent},
    { path: 'torneos', component: TorneosComponent },
    { path: 'membrasias', component: MembrasiasComponent },
    { path: 'atletas', component: AtletasComponent, canActivate:[AuthGuard]},
    { path: 'perfil', component: PerfilComponent, canActivate:[AuthGuard]}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [AuthGuard],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
} 