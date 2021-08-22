import { Component, Input, OnInit } from '@angular/core';
import { SolicitudAmistadResponseDTO } from 'src/app/models/response.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.css']
})
export class SolicitudesPendientesComponent implements OnInit {

  solicitudes: SolicitudAmistadResponseDTO[] = [];
  result: boolean = false;

  constructor(private solicitudService: SolicitudService,
              public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.solicitudService.getSolicitudesPendientes().subscribe((data: any) => {
      this.solicitudes = data.solicitudes;
      if (this.solicitudes.length === 0) {
        this.result = true;
      }
    });
  }

  public rechazarSolicitud(id: string) {
    this.solicitudService.rechazarSolicitudAmistad(id).subscribe((data: any) => {
      if (data.ok) {
        Swal.fire('Rechazada!', 'Solicitud de amistad rechazada!', 'info');
        this.solicitudes = this.solicitudes.filter(s => s.id !== id);
      }
    }, (err) => {
      Swal.fire('Error!', 'Ocurrio un error consulte con el administrador!', 'error');
    });
  }

  public aceptarSolicitud(id: string) {
    this.solicitudService.aceptarSolicitudAmistad(id).subscribe(data => {
      Swal.fire('Aceptada!', 'Ya son amigos!', 'success');
    });
  }

}
