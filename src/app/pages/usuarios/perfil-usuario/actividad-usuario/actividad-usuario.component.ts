import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  isUsuarioLogueado: boolean = true;
  @Input('usuarioLogueado') usuarioLogueado: UsuarioResponseDTO;
  
  constructor(private usuarioService: UsuarioService,
              private publicacionService: PublicacionService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: string = params.get('id');
      if (id !== undefined && id !== null && id !== '') {
        this.usuarioService.getUsuarioById(id).subscribe((data: any) => {
          this.usuario = data.usuario;
          this.isUsuarioLogueado = false;
          this.imgUrl = this.usuarioService.getUrlImagen(this.usuario);
        });
      } else {
        this.imgUrl = this.usuarioService.getUrlImagen(this.usuarioLogueado);
        this.obtenerPublicacionesUsuarioLogueado();
      }
    });
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
