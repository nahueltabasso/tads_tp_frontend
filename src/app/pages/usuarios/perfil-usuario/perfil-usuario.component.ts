import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudAmistadRequestDTO } from 'src/app/models/request.model';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  imagenUrl: string;
  flagBotonAgregarAmigo: boolean = true;
  titulo: string;
  totalPublicaciones: number;
  totalAmigos: number;

  constructor(private authService: AuthService,
              private usuarioService: UsuarioService,
              private solicitudService: SolicitudService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: string = params.get('id');
      if (id !== null && id !== undefined && id !== '') {
        // Implica que es el perfil de otro usuario
        this.usuarioService.getUsuarioById(id).subscribe((data: any) => {
          this.usuario = data.usuario;
          this.imagenUrl = this.usuarioService.getUrlImagen(this.usuario);
          this.titulo = 'Perfil de ' + this.usuario.nombreApellido;
          this.getCantidadPublicacionesAndAmigosByUsuario();
        }, (err) => {
          console.error(err);
          this.router.navigateByUrl('/not-found');
        });
      } else {
        // Implica que es el perfil del usuario logueado
        this.usuario = this.authService.usuario;
        this.imagenUrl = this.usuarioService.getUrlImagen(this.usuario);
        this.flagBotonAgregarAmigo = false;
        this.titulo = 'Mi Perfil';
        this.getCantidadPublicacionesAndAmigosByUsuario();
      } 
    });
  }

  private getCantidadPublicacionesAndAmigosByUsuario() {
    this.usuarioService.getCantidadPublicacionesAndCantidadAmigosSegunUsuario(this.usuario.id).subscribe((data: any) => {
      this.totalAmigos = data.totalAmigos;
      this.totalPublicaciones = data.totalPublicaciones
    });
  }

  public enviarSolicitudDeAmistad() {
    let solicitud = new SolicitudAmistadRequestDTO();
    solicitud.emailEmisor = this.authService.usuario.email;
    solicitud.usuarioEmisor = this.authService.usuario.id;
    solicitud.emailReceptor = this.usuario.email;
    solicitud.usuarioReceptor = this.usuario.id;
  console.log(solicitud);
    this.solicitudService.enviarSolicitudAmistad(solicitud).subscribe(data => {
      Swal.fire('Enviada!', 'Solicitud enviada!', 'success');
    }, (err) => {
      console.log(err);
      Swal.fire('Atencion!', err.error.msg, 'info');
    });
  }

  public actualizarCantidadPublicaciones(event) {
    this.totalPublicaciones = this.totalPublicaciones - event;
  }

  public sumarCantidadPublicaciones(event) {
    this.totalPublicaciones = this.totalPublicaciones + event;
  }

}
