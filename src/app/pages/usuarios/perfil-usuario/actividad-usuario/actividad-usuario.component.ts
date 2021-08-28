import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  isUsuarioLogueado: boolean = true;
  flagNoResults: boolean = false;
  @Input('usuarioLogueado') usuario: UsuarioResponseDTO;

  // Infinite Scroll - Paginacion
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const position = document.documentElement.scrollTop + 1300;    // Posicion actual del scroll 
    const maxScrollPosition = document.documentElement.scrollHeight;  // Posicion maxima del scroll

    if (position > maxScrollPosition) {  
      // Hacer request al servidor
      if (this.publicacionService.cargando) return;
      this.publicacionService.getAllByUsuarioPaginados(this.usuario.id).subscribe((data: any) => {
        this.publicaciones.push(...data.result.docs);
      }); 
    }
  }
  
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
          this.obtenerPublicacionesUsuario(this.usuario.id);
        });
      } else {
        this.imgUrl = this.usuarioService.getUrlImagen(this.usuario);
        this.obtenerPublicacionesUsuario(this.usuario.id);
      }
    });
  }

  private obtenerPublicacionesUsuario(idUsuario: string) {
    this.publicacionService.getAllByUsuarioPaginados(idUsuario).subscribe((data: any) => {
      this.publicaciones = data.result.docs;
      if (this.publicaciones.length === 0) {
        this.flagNoResults = true;
      }
    });
  }

  public getImagenPublicacion(srcImagen: string) {
    return this.publicacionService.getUrlImagen(srcImagen);
  }

  public eliminarPublicacion(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea esta publicacion?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.publicacionService.deletePublicacion(id).subscribe(data => {
          Swal.fire('Eliminada!', 'Publicacion eliminada con exito!', 'success');
          this.publicaciones = this.publicaciones.filter(p => p.id !== id);
        }, (err) => {
          Swal.fire('Error!', `${err.error.msg}`, 'error');
        });
      }
    });
  }
}