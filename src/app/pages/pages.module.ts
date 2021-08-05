import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// import { authInterceptorProviders } from '../helpers/auth.interceptors';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompletarPerfilComponent } from './usuarios/completar-perfil/completar-perfil.component';
import { PerfilUsuarioComponent } from './usuarios/perfil-usuario/perfil-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    CompletarPerfilComponent,
    PerfilUsuarioComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    CompletarPerfilComponent,
    PerfilUsuarioComponent
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
