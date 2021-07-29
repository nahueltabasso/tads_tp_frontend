import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// import { authInterceptorProviders } from '../helpers/auth.interceptors';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { CompletarPerfilComponent } from './completar-perfil/completar-perfil.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    CompletarPerfilComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    // authInterceptorProviders,
  ]
})
export class PagesModule { }
