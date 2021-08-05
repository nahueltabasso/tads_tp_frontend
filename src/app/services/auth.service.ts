import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestDTO, ResetPasswordDTO, UsuarioRegistroRequestDTO } from '../models/request.model';
import { UsuarioResponseDTO } from '../models/response.model';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  endpointSeguridad = environment.server_url + '/auth';
  auth2: any;

  constructor(private http: HttpClient,  
              private router: Router,
              private ngZone: NgZone) {
    this.googleSignInInit();
  }

  login(loginRequestDto: LoginRequestDTO): Observable<string> {
    return this.http.post<string>(this.endpointSeguridad + '/signin', loginRequestDto);
  }

  registrarUsuario(usuario: UsuarioRegistroRequestDTO, recaptcha: string): Observable<String> {
    return this.http.post<string>(this.endpointSeguridad + '/signup?recaptcha=' + recaptcha, usuario);
  }

  activarCuenta(token: string): Observable<String> {
    return this.http.post<string>(this.endpointSeguridad + '/active-account?token=' + token, null);
  }

  getRefreshToken(headers: any): Observable<String> {
    return this.http.post<string>(this.endpointSeguridad + '/refresh-token', null, {headers: headers});
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(this.endpointSeguridad + '/password/forgot-password?email=' + email, null);
  }

  resetPassword(passwordDto: ResetPasswordDTO): Observable<string> {
    return this.http.post<string>(this.endpointSeguridad + '/password/reset-password', passwordDto);
  }

  googleLogin(token: any): Observable<string> {
    return this.http.post<string>(this.endpointSeguridad + '/google-signin', token);
  }

  getMenu(nombreRol: string): Observable<String> {
    return this.http.get<String>(this.endpointSeguridad + '/getMenuUsuarioLogueado/' + nombreRol, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('auth_token') || '';
    return this.http.get(this.endpointSeguridad + '/refresh-token', { headers : { 'Authorization' : token }}).pipe(
      map((data: any) => {
        localStorage.setItem('auth_token', data.token);
        this.usuario = data.usuario;
        localStorage.setItem('auth_user', data.usuario);
        localStorage.setItem('menu', JSON.stringify(data.menu));
        return true;
      }),
      catchError(err => of(false))
    );
  }

  googleSignInInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1005407688819-djrnng2c8q7ask6frur93847le44et7v.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }

  saveLocalStorage(token: string, usuarioLogueado: any) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('usuario');
    this.auth2.signOut().then(function () {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  isAuthenticated() {
    const token = localStorage.getItem('auth-token');
    if (token) return true;
    return false;
  }
}
