import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestDTO, ResetPasswordDTO, UsuarioRegistroRequestDTO } from '../models/request.model';
import { UsuarioResponseDTO } from '../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  endpointSeguridad = environment.server_url + '/auth';

  constructor(private http: HttpClient) {}

  login(loginRequestDto: LoginRequestDTO): Observable<string> {
    return this.http.post<string>(this.endpointSeguridad + '/signin', loginRequestDto);
  }

  registrarUsuario(usuario: UsuarioRegistroRequestDTO, recaptcha: string): Observable<String> {
    return this.http.post<string>(this.endpointSeguridad + '/signup?recaptcha=' + recaptcha, usuario);
  }

  activarCuenta(token: string): Observable<String> {
    return this.http.post<string>(this.endpointSeguridad + '/active-account?token=' + token, null);
  }

  getRefreshToken(): Observable<String> {
    return this.http.post<string>(this.endpointSeguridad + '/refresh-token', null);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(this.endpointSeguridad + '/password/forgot-password?email=' + email, null);
  }

  resetPassword(passwordDto: ResetPasswordDTO): Observable<string> {
    return this.http.post<string>(this.endpointSeguridad + '/password/reset-password', passwordDto);
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
  }
}
