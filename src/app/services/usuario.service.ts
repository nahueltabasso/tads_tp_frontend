import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioResponseDTO } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  imgUrl: string = '';
  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  url: string = environment.server_url + '/file';

  endPoint = environment.server_url + '/usuarios';
  endPointFiles = environment.server_url + '/file';

  constructor(private http: HttpClient) {}

  getUsuarioById(id: string): Observable<UsuarioResponseDTO> {
    return this.http.get<UsuarioResponseDTO>(this.endPoint + '/' + id, { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }

  getEstadosCombo(): Observable<string[]> {
    return this.http.get<string[]>(this.endPoint + '/getEstadosSentimentales', { headers : { 'Authorization' : localStorage.getItem('auth_token') }});
  }

  actualizarPerfil(usuario: UsuarioResponseDTO, id: string): Observable<UsuarioResponseDTO> {
    return this.http.put<UsuarioResponseDTO>(this.endPoint + '/' + id, usuario, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  async actualizarFotoPerfil(idUsuario: string, archivo: File) {
    let tipo = 'perfiles';
    try {
      const url = `${this.endPoint}/actualizarFotoPerfil/${tipo}/${idUsuario}`;
      const formData = new FormData();
      formData.append('image', archivo);

      const rta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('auth_token')
        },
        body: formData
      });

      const data = await rta.json();

      if ( data.ok ) {
        return data;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getUrlImagen(usuario: UsuarioResponseDTO) {
    if (usuario.google) {
      if (usuario.srcImagen.includes('https')) {
        return usuario.srcImagen;
      }
    }

    if (!usuario.srcImagen) {
        return `${this.url}/perfiles/no-image.png`;
    } 
    return `${this.url}/perfiles/${usuario.srcImagen}`;
  }
}
