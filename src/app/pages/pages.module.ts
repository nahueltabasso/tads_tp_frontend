import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// import { authInterceptorProviders } from '../helpers/auth.interceptors';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompletarPerfilComponent } from './usuarios/completar-perfil/completar-perfil.component';
import { PerfilUsuarioComponent } from './usuarios/perfil-usuario/perfil-usuario.component';
import { ConfiguracionPerfilComponent } from './usuarios/perfil-usuario/configuracion-perfil/configuracion-perfil.component';
import { ActividadTemporalComponent } from './usuarios/perfil-usuario/actividad-temporal/actividad-temporal.component';
import { ActividadUsuarioComponent } from './usuarios/perfil-usuario/actividad-usuario/actividad-usuario.component';
import { PublicacionesListComponent } from './usuarios/publicaciones/publicaciones-list/publicaciones-list.component';
import { PublicacionesAddComponent } from './usuarios/publicaciones/publicaciones-add/publicaciones-add.component';
import { SolicitudesPendientesComponent } from './usuarios/solicitudes-pendientes/solicitudes-pendientes.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    CompletarPerfilComponent,
    PerfilUsuarioComponent,
    ConfiguracionPerfilComponent,
    ActividadTemporalComponent,
    ActividadUsuarioComponent,
    PublicacionesListComponent,
    PublicacionesAddComponent,
    SolicitudesPendientesComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    CompletarPerfilComponent,
    PerfilUsuarioComponent,
    ConfiguracionPerfilComponent,
    ActividadTemporalComponent,
    ActividadUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // authInterceptorProviders,
  ]
})
export class PagesModule { }
