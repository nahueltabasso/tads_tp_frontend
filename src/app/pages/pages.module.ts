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
import { SearchComponent } from './search/search.component';
import { LikeComponent } from './usuarios/publicaciones/like/like.component';
import { ChatComponent } from './chat/chat.component';
import { MensajesComponent } from './chat/mensajes/mensajes.component';
import { ListaUsuariosComponent } from './chat/lista-usuarios/lista-usuarios.component';

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
    SolicitudesPendientesComponent,
    SearchComponent,
    LikeComponent,
    ChatComponent,
    MensajesComponent,
    ListaUsuariosComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    CompletarPerfilComponent,
    PerfilUsuarioComponent,
    ConfiguracionPerfilComponent,
    ActividadTemporalComponent,
    ActividadUsuarioComponent,
    SearchComponent,
    ChatComponent,
    MensajesComponent,
    ListaUsuariosComponent,
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
