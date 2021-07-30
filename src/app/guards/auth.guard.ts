import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    return this.authService.validarToken().pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  
}
