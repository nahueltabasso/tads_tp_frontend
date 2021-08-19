import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicacionResponseDTO } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  url: string = environment.server_url + '/file';
  endpoint = environment.server_url + '/publicacion';

  constructor(private http: HttpClient) {}

  registrarPublicacion(publicacion: PublicacionResponseDTO, archivo: File): Observable<PublicacionResponseDTO> {
    const formData = new FormData();
    formData.append('image', archivo);
    formData.append('titulo', publicacion.titulo);
    formData.append('descripcion', publicacion.descripcion);
    formData.append('usuario', publicacion.usuario.id);

    return this.http.post<PublicacionResponseDTO>(this.endpoint + '/publicaciones', formData, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getAllByUsuarioLogueado(): Observable<PublicacionResponseDTO[]> {
    return this.http.get<PublicacionResponseDTO[]>(this.endpoint, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  deletePublicacion(id: string): Observable<string> {
    return this.http.delete<string>(this.endpoint + '/' + id, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getUrlImagen(srcImagen: string) {
    return `${this.url}/publicaciones/${srcImagen}`;
  }
}
