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
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea rechazar esta solicitud?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Rechazar!'
    }).then((result) => {
      if (result.value) {
        this.solicitudService.rechazarSolicitudAmistad(id).subscribe((data: any) => {
          if (data.ok) {
            Swal.fire('Rechazada!', 'Solicitud de amistad rechazada!', 'info');
            this.solicitudes = this.solicitudes.filter(s => s.id !== id);
            this.actualizarEstadoResult();
          }
        }, (err) => {
          Swal.fire('Error!', 'Ocurrio un error consulte con el administrador!', 'error');
        });
      }
    });
  }

  public aceptarSolicitud(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea aceptarlo como amigo?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Aceptar!'
    }).then((result) => {
      if (result.value) {
        this.solicitudService.aceptarSolicitudAmistad(id).subscribe(data => {
          Swal.fire('Aceptada!', 'Ya son amigos!', 'success');
          this.solicitudes = this.solicitudes.filter(s => s.id !== id);
          this.actualizarEstadoResult();
        });
      }
    });
  }

  private actualizarEstadoResult() {
    if (this.solicitudes.length === 0) {
      this.result = true;
    }
  }

}
