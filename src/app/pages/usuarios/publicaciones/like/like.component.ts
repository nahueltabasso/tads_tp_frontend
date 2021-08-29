import { Component, Input, OnInit } from '@angular/core';
import { PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  mostrarMeGustaRojo: boolean = false;
  totalCantidadMeGusta: number = 0;
  @Input('publicacion') publicacion: PublicacionResponseDTO;
  @Input('usuario') usuario: UsuarioResponseDTO;

  constructor(private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    this.publicacionService.getIfUsuarioReaccionPublicacion(this.publicacion.id, this.usuario.id).subscribe((data: any) => {
      this.mostrarMeGustaRojo = data.reaccion;
    });
    
    this.publicacionService.getCantidadMeGustaByPublicacion(this.publicacion.id).subscribe((result: any) => {
      this.totalCantidadMeGusta = result.cantReacciones;
    });
  }

  public reaccionarMeGusta(idPublicacion: string) {
    let idUsuario = this.usuario.id;
    this.publicacionService.registrarMeGustaPublicacion(idPublicacion, idUsuario).subscribe((data: any) => {
      if (data.ok) {
        Swal.fire('Te Gusta', 'Haz reaccionado a la publicacion', 'success');
        this.totalCantidadMeGusta++;
        this.mostrarMeGustaRojo = true;
      }
    });
  }

  public borrarMeGusta() {
    this.publicacionService.borrarMeGusta(this.publicacion.id, this.usuario.id).subscribe((data: any) => {
      if (data === null) {
        Swal.fire('No te gusta', 'Se ha borrado tu reaccion a la publicacion', 'success');
        this.totalCantidadMeGusta--;
        this.mostrarMeGustaRojo = false;
      }
    });
  }

  public displayText() {
    if (this.totalCantidadMeGusta > 0) {
      return `Me gusta (${this.totalCantidadMeGusta})`;
    } else {
      return 'Me gusta';
    }
  }

}
