import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SolicitudAmistadRequestDTO } from '../models/request.model';
import { SolicitudAmistadResponseDTO } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  endpoint = environment.server_url + '/solicitudes';

  constructor(private http: HttpClient) {}

  getSolicitudesPendientes(): Observable<SolicitudAmistadResponseDTO[]> {
    return this.http.get<SolicitudAmistadResponseDTO[]>(this.endpoint + '/listar-solicitudes-usuario', { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }

  rechazarSolicitudAmistad(id: string): Observable<any> {
    return this.http.delete<any>(this.endpoint + '/rechazar-solicitud/' + id, { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }

  aceptarSolicitudAmistad(id: string): Observable<string> {
    return this.http.put<string>(this.endpoint + '/aceptar-solicitud/' + id, null, { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }

  enviarSolicitudAmistad(solicitud: SolicitudAmistadRequestDTO): Observable<SolicitudAmistadResponseDTO> {
    return this.http.post<SolicitudAmistadResponseDTO>(this.endpoint + '/enviar-solicitud', solicitud, { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }

  getIdsAmigosByUsuarioId(idUsuario: string): Observable<Number> {
    return this.http.get<Number>(this.endpoint + '/getAmigos/' + idUsuario, { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }

}
