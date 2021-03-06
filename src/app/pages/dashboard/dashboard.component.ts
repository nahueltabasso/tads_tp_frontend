import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { PublicacionesViewComponent } from '../usuarios/publicaciones/publicaciones-view/publicaciones-view.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  idsAmigosUsuarioLogueado: string[] = [];
  page: number = 0;
  totalPublicaciones: number = 0;
  publicaciones: PublicacionResponseDTO[] = [];
  flagNoResults: boolean = false;
  ocultarBoton: boolean = true;
  flagLoading: boolean = false;
  imgUrl: string;

  constructor(private solicitudService: SolicitudService,
              private authService: AuthService,
              private publicacionService: PublicacionService,
              private usuarioService: UsuarioService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    this.imgUrl = this.usuarioService.getUrlImagen(this.usuario);
    this.solicitudService.getIdsAmigosByUsuarioId(this.usuario.id).subscribe((data: any) => {
      this.idsAmigosUsuarioLogueado = data.idsAmigos;
      this.cargarPublicaciones();
    });
  }

  public cambiarPagina(page: number) {
    this.page = this.page + page;
    if (this.page > this.totalPublicaciones) {
      Swal.fire('Atencion', 'No hay mas publicaciones por ver!', 'info');
      return;
    }
    this.ocultarBoton = true;
    this.cargarPublicaciones();
  }

  public cargarPublicaciones() {
    if (this.idsAmigosUsuarioLogueado.length > 0) {
      this.flagLoading = true;
      this.publicacionService.getAllAmigosPaginados(this.idsAmigosUsuarioLogueado, this.page).subscribe((data: any) => {
        let publicacionesNuevas = data.publicaciones;
        publicacionesNuevas.forEach(p => this.publicaciones.push(p));
        this.totalPublicaciones = data.totalPublicaciones;
        this.ocultarBoton = false;
        this.flagLoading = false;
        this.setFlagNoResults();
      }); 
    } else {
      this.flagNoResults = true;
    }
  }

  private setFlagNoResults() {
    if (this.publicaciones.length === 0) {
      this.flagNoResults = true;
    }
  }

  public getImagenPublicacion(srcImagen: string) {
    return this.publicacionService.getUrlImagen(srcImagen);
  }

  public getUrlImagenUsuario(u: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(u);
  }
  
  public reaccionarMeGusta(idPublicacion: string) {
    let idUsuario = this.usuario.id;
    this.publicacionService.registrarMeGustaPublicacion(idPublicacion, idUsuario).subscribe((data: any) => {
      if (data.ok) {
        Swal.fire('Te Gusta', 'Haz reaccionado a la publicacion', 'success');
      }
    });
  }

  public agregarNuevaPublicacion(event) {
    this.publicaciones.unshift(event);
    this.totalPublicaciones++;
  }

  public view(publicacion: PublicacionResponseDTO) {
    const dialogRef = this.dialog.open(PublicacionesViewComponent, {
      data: { publicacion: publicacion,
              usuario: this.usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
