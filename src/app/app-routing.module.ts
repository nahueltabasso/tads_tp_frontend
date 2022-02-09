import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NotPageFoundComponent } from './pages/not-page-found/not-page-found.component';
import { PagesRoutingModule } from './pages/pages.routing';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
  { path: '**', component: NotPageFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
