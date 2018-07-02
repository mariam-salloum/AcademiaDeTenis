import { RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { AuthGuard } from './auth/guards/auth.guard';

// Features
import { InicioComponent } from '../app/secciones/inicio/inicio.component';
import { TorneosComponent } from './secciones/torneos/torneos.component';
import { MembresiasComponent } from './secciones/membresias/membresias.component';
import { CrearMembresiaComponent } from './secciones/membresias/crear-membresia/crear-membresia.component';
import { EditarMembresiaComponent } from './secciones/membresias/editar-membresia/editar-membresia.component';
import { AtletasComponent } from './secciones/atletas/atletas.component';
import { PerfilComponent } from './secciones/perfil/perfil.component';
import { InfoComponent } from './secciones/info/info.component';
import { CategoriasComponent } from './secciones/categorias/categorias.component';
import { CrearCategoriaComponent } from './secciones/categorias/crear-categoria/crear-categoria.component';
import { PagosComponent } from './secciones/pagos/pagos.component';
import { TiendaVirtualComponent } from './secciones/tienda-virtual/tienda-virtual.component';
import { CrearTorneoComponent } from './secciones/torneos/crear-torneo/crear-torneo.component';
import { ParticipantesComponent } from './secciones/torneos/participantes/participantes.component';
import { AgregarParticipanteComponent } from './secciones/torneos/participantes/agregar-participante/agregar-participante.component';
import { PagoComponent } from './secciones/pagos/pago/pago.component';
import { AgregarProductoComponent } from './secciones/tienda-virtual/agregar-producto/agregar-producto.component';
import { ProductoComponent } from './secciones/tienda-virtual/producto/producto.component';

const appRoutes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registrar', component: RegistrarComponent, /*canActivate:[AuthGuard]*/},
    { path: 'academiadetenis_info', component: InfoComponent},
    { path: 'torneos', component: TorneosComponent },
    { path: 'crear-torneo', component: CrearTorneoComponent, /*canActivate:[AuthGuard]*/},
    { path: 'membresias', component: MembresiasComponent },
    { path: 'crear-membresia', component: CrearMembresiaComponent, /*canActivate:[AuthGuard]*/},
    { path: 'membresia/:id', component: EditarMembresiaComponent, /*canActivate:[AuthGuard]*/},
    { path: 'categorias', component: CategoriasComponent },
    { path: 'crear-categoria', component: CrearCategoriaComponent, /*canActivate:[AuthGuard]*/},
    { path: 'atletas', component: AtletasComponent, /*canActivate:[AuthGuard]*/},
    { path: 'pagos', component: PagosComponent, /*canActivate:[AuthGuard]*/},
    { path: 'pago/:id', component: PagoComponent, /*canActivate:[AuthGuard]*/},
    { path: 'tienda-virtual', component: TiendaVirtualComponent },
    { path: 'perfil', component: PerfilComponent, /*canActivate:[AuthGuard]*/},
    { path: 'participantes/:id', component: ParticipantesComponent},
    { path: 'agregar-participante/:id', component: AgregarParticipanteComponent, /*canActivate:[AuthGuard]*/},
    { path: 'producto/:id', component: ProductoComponent, /*canActivate:[AuthGuard]*/},
    { path: 'agregar-producto', component: AgregarProductoComponent, /*canActivate:[AuthGuard]*/},
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