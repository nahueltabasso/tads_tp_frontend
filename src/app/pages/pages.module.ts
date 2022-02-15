import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import * as moment from 'moment';
import { AngularEmojisModule } from 'angular-emojis';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

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
import { PublicacionAddMultipleComponent } from './usuarios/publicaciones/publicacion-add-multiple/publicacion-add-multiple.component';
import { AmigosListComponent } from './usuarios/amigos-list/amigos-list.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { UsuariosMantenedorComponent } from './mantenedores/usuarios-mantenedor/usuarios-mantenedor.component';

moment.locale('es');

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
    PublicacionAddMultipleComponent,
    AmigosListComponent,
    NotPageFoundComponent,
    UsuariosMantenedorComponent
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
    NotPageFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEmojisModule,
    PickerModule
  ],
  providers: [
    // authInterceptorProviders,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule { }
