import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { SolicitudAmistadResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {

  solicitudesPendientes: SolicitudAmistadResponseDTO[] = [];
  usuariosAutoCompleteControl = new FormControl();
  usuariosAautoCompleteList: UsuarioResponseDTO[] = [];
  usuariosFiltered: Observable<UsuarioResponseDTO[]>;

  constructor(private usuarioService: UsuarioService,
              private solicitudService: SolicitudService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.solicitudService.getSolicitudesPendientes().subscribe((data: any) => {
      this.solicitudesPendientes = data.solicitudes;
    }, (err) => {});

    // Inciamos el autocomplete
    this.usuariosAutoCompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string'? value : value.nombreApellido),
      flatMap(value => value ? this.usuarioService.searchByTermino(value) : [])
    ).subscribe((data: any) => {
      this.usuariosAautoCompleteList = data.usuarios;
    });

  }

  public getImagenUsuario(usuario: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(usuario);
  }

  public displayNombreUsuario(usuario?: UsuarioResponseDTO): string {
    return usuario ? usuario.nombreApellido : '';
  }

  public redireccionarAlPerfilUsuario(usuario: UsuarioResponseDTO) {  
    setTimeout(() => {
      if (usuario.id !== this.authService.usuario.id) {
        this.router.navigateByUrl('/dashboard/perfil/' + usuario.id);
      } else {
        // Implica que se selecciono al usuario logueado
        this.router.navigateByUrl('/dashboard/mi-perfil');
      }
    }, 500);
  }

  public calcularDiferenciaEntreCurrentTimeAndCreateAtSolicitud(s: SolicitudAmistadResponseDTO) {
  }
}
