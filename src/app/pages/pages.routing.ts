import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompletarPerfilComponent } from './completar-perfil/completar-perfil.component';

const routes: Routes = [
    { path: 'dashboard', component: PagesComponent,
      children: [
        { path: '', component: DashboardComponent },
        { path: 'completar-perfil', component: CompletarPerfilComponent }
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
