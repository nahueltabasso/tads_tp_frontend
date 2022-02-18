import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentarioResponseDTO, PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-publicaciones-view',
  templateUrl: './publicaciones-view.component.html',
  styleUrls: ['./publicaciones-view.component.css']
})
export class PublicacionesViewComponent implements OnInit {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  publicacion: PublicacionResponseDTO = new PublicacionResponseDTO();
  comentarios: ComentarioResponseDTO[] = [];
  page: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PublicacionesViewComponent>,
              private usuarioService: UsuarioService,
              private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    this.usuario = this.data.usuario as UsuarioResponseDTO;
    this.publicacion = this.data.publicacion as PublicacionResponseDTO;
    this.cargarComentarios();
  }

  public getUrlImagenUsuario(u: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(u);
  }

  public cargarComentarios() {
    this.publicacionService.getComentariosPaginadosByPublicacion(this.publicacion.id, this.page).subscribe((data: any) => {
      let comentariosResponse = data.comentarios;
      comentariosResponse.forEach(c => this.comentarios.push(c));
    });
  }
  
  public cambiarPagina(page: number) {
    this.page = this.page + page;
    this.cargarComentarios();
  }


}
