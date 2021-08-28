import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PublicacionResponseDTO } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  url: string = environment.server_url + '/file';
  publicacionesPage = 0;
  cargando: boolean = false;
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

  getAllByUsuario(idUsuario: string): Observable<PublicacionResponseDTO[]> {
    return this.http.get<PublicacionResponseDTO[]>(this.endpoint + '/getPublicacionesUsuario/' + idUsuario, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getAllByUsuarioPaginados(idUsuario: string): Observable<PublicacionResponseDTO[]> {
    if (this.cargando) return;
    
    this.cargando = true;
    return this.http.get<PublicacionResponseDTO[]>(this.endpoint + '/getPublicacionesUsuarioPaginadas/' + idUsuario + '?size=5&page=' + this.publicacionesPage, 
    { headers: { 'Authorization': localStorage.getItem('auth_token') } })
      .pipe(
        tap(() => {
          this.publicacionesPage += 1;
          this.cargando = false;
        })
      );
  }

  getAllAmigosPaginados(idsAmigos: string[], page: number): Observable<PublicacionResponseDTO[]> {
    if (this.cargando) return;
    
    this.cargando = true;
    return this.http.get<PublicacionResponseDTO[]>(this.endpoint + '/getPublicacionesByAmigos/' + idsAmigos + '?desde=' + page, 
    { headers: { 'Authorization': localStorage.getItem('auth_token') } })
      .pipe(
        tap(() => {
          this.cargando = false;
        })
      );
  }

  deletePublicacion(id: string): Observable<string> {
    return this.http.delete<string>(this.endpoint + '/' + id, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getUrlImagen(srcImagen: string) {
    return `${this.url}/publicaciones/${srcImagen}`;
  }
}
