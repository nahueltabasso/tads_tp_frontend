import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MensajeChatResponseDTO } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MensajeChatService {

  endpoint = environment.server_url + '/mensaje-chat';

  constructor(private http: HttpClient) {}

  getHistorialChat(idUsuario: string): Observable<MensajeChatResponseDTO[]> {
    return this.http.get<MensajeChatResponseDTO[]>(this.endpoint + '/' + idUsuario, { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }
}
