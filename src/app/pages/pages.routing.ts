import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompletarPerfilComponent } from './usuarios/completar-perfil/completar-perfil.component';
import { PerfilUsuarioComponent } from './usuarios/perfil-usuario/perfil-usuario.component';
import { PublicacionesAddComponent } from './usuarios/publicaciones/publicaciones-add/publicaciones-add.component';
import { SolicitudesPendientesComponent } from './usuarios/solicitudes-pendientes/solicitudes-pendientes.component';
import { SearchComponent } from './search/search.component';
import { AmigosListComponent } from './usuarios/amigos-list/amigos-list.component';

const routes: Routes = [
    { path: 'dashboard', component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: DashboardComponent },
        { path: 'completar-perfil/:id', component: CompletarPerfilComponent },
        { path: 'mi-perfil', component: PerfilUsuarioComponent },
        { path: 'perfil/:id', component: PerfilUsuarioComponent },
        { path: 'publicacion/nueva-publicacion', component: PublicacionesAddComponent },
        { path: 'amigos/solicitudes-pendientes', component: SolicitudesPendientesComponent },
        { path: 'search', component: SearchComponent },
        { path: 'mis-amigos', component: AmigosListComponent }
      ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
