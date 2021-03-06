import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ComentarioRequestDTO } from '../models/request.model';
import { PublicacionResponseDTO, ReaccionDTO, ComentarioResponseDTO } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  url: string = environment.server_url + '/file';
  publicacionesPage = 1;
  cargando: boolean = false;
  endpoint = environment.server_url + '/publicacion';
  endpointReaccion = environment.server_url + '/reaccion';
  endpointComentario = environment.server_url + '/comentario';

  constructor(private http: HttpClient) {}

  registrarPublicacion(publicacion: PublicacionResponseDTO, archivo: File): Observable<PublicacionResponseDTO> {
    const formData = new FormData();
    formData.append('image', archivo);
    formData.append('titulo', publicacion.titulo);
    formData.append('descripcion', publicacion.descripcion);
    formData.append('usuario', publicacion.usuario.id);

    return this.http.post<PublicacionResponseDTO>(this.endpoint + '/cloudinary/publicaciones', formData, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  registrarPublicacionWithMultipleFiles(publicacion: PublicacionResponseDTO, archivos: File[]): Observable<PublicacionResponseDTO> {
    const formData = new FormData();
    // formData.append('image', archivos);
    const size = archivos.length;
    for (let i = 0; i < size; i++) {
      formData.append('image', archivos[i]);
    }

    formData.append('titulo', publicacion.titulo);
    formData.append('descripcion', publicacion.descripcion);
    formData.append('usuario', publicacion.usuario.id);

    return this.http.post<PublicacionResponseDTO>(this.endpoint + '/cloudinary-multiple/publicaciones', formData, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
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

  registrarMeGustaPublicacion(idPublicacion: string, idUsuario: string): Observable<ReaccionDTO> {
    return this.http.post<ReaccionDTO>(this.endpointReaccion + '/' + idPublicacion + '/' + idUsuario, null , { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getIfUsuarioReaccionPublicacion(idPublicacion: string, idUsuario: string): Observable<boolean> {
    return this.http.get<boolean>(this.endpointReaccion + '/isUsuarioReaccion/' + idPublicacion + '/' + idUsuario, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getCantidadMeGustaByPublicacion(idPublicacion: string): Observable<number> {
    return this.http.get<number>(this.endpointReaccion + '/getCantidadReaccionesByPublicacion/' + idPublicacion, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  borrarMeGusta(idPublicacion: string, idUsuario: string): Observable<boolean> {
    return this.http.delete<boolean>(this.endpointReaccion + '/' + idPublicacion + '/' + idUsuario, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getUrlImagen(srcImagen: string) {
    return `${this.url}/publicaciones/${srcImagen}`;
  }

  getIfUsuarioComentarioPublicacion(idPublicacion: string, idUsuario: string): Observable<boolean> {
    return this.http.get<boolean>(this.endpointComentario + '/isUsuarioComentario/' + idPublicacion + '/' + idUsuario, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getCantidadComentariosByPublicacion(idPublicacion: string): Observable<number> {
    return this.http.get<number>(this.endpointComentario + '/getCantidadComentariosByPublicacion/' + idPublicacion, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  registrarComentarioPublicacion(comentarioRequestDTO: ComentarioRequestDTO): Observable<ComentarioResponseDTO> {
    return this.http.post<ComentarioResponseDTO>(this.endpointComentario, comentarioRequestDTO , { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getComentariosPaginadosByPublicacion(idPublicacion: string, page: number): Observable<ComentarioResponseDTO[]> {
    return this.http.get<ComentarioResponseDTO[]>(this.endpointComentario + '/getComentariosByPublicacion/' + idPublicacion + '?desde=' + page, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }
}
