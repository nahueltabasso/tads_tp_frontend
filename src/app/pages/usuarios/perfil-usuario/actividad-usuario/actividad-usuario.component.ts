import { Component, Input, OnInit } from '@angular/core';
import { PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad-usuario',
  templateUrl: './actividad-usuario.component.html',
  styleUrls: ['./actividad-usuario.component.css']
})
export class ActividadUsuarioComponent implements OnInit {

  imgUrl: string;
  publicaciones: PublicacionResponseDTO[];
  @Input('usuarioLogueado') usuarioLogueado: UsuarioResponseDTO;
  
  constructor(private usuarioService: UsuarioService,
              private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    this.imgUrl = this.usuarioService.getUrlImagen(this.usuarioLogueado);
    this.obtenerPublicacionesUsuarioLogueado();
  }

  private obtenerPublicacionesUsuarioLogueado() {
    this.publicacionService.getAllByUsuarioLogueado().subscribe((data: any) => {
      this.publicaciones = data.publicaciones;
      console.log(this.publicaciones);
    });
  }

  public getImagenPublicacion(srcImagen: string) {
    return this.publicacionService.getUrlImagen(srcImagen);
  }

  public eliminarPublicacion(id: string) {
    this.publicacionService.deletePublicacion(id).subscribe(data => {
      Swal.fire('Eliminada!', 'Publicacion eliminada con exito!', 'success');
      this.publicaciones = this.publicaciones.filter(p => p.id !== id);
    }, (err) => {
      Swal.fire('Error!', `${err.error.msg}`, 'error');
    })
  }
}
