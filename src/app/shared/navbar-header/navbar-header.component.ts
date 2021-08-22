import { Component, OnInit } from '@angular/core';
import { SolicitudAmistadResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {

  solicitudesPendientes: SolicitudAmistadResponseDTO[] = [];

  constructor(private authService: AuthService,
              private usuarioService: UsuarioService,
              private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.solicitudService.getSolicitudesPendientes().subscribe((data: any) => {
      this.solicitudesPendientes = data.solicitudes;
    }, (err) => {});
  }

  public getImagenUsuario(usuario: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(usuario);
  }

}
