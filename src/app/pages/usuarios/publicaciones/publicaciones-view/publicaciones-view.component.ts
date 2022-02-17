import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-publicaciones-view',
  templateUrl: './publicaciones-view.component.html',
  styleUrls: ['./publicaciones-view.component.css']
})
export class PublicacionesViewComponent implements OnInit {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  publicacion: PublicacionResponseDTO = new PublicacionResponseDTO();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PublicacionesViewComponent>,
              private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.data.usuario as UsuarioResponseDTO;
    this.publicacion = this.data.publicacion as PublicacionResponseDTO;
    console.log(this.usuario);
    console.log(this.publicacion);
  }

  public getUrlImagenUsuario(u: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(u);
  }
  

}
