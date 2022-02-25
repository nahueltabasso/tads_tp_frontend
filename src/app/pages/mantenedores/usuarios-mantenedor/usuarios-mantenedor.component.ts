import { Component, OnInit } from '@angular/core';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-mantenedor',
  templateUrl: './usuarios-mantenedor.component.html',
  styleUrls: ['./usuarios-mantenedor.component.css']
})
export class UsuariosMantenedorComponent implements OnInit {

  usuarioLogueado: UsuarioResponseDTO = new UsuarioResponseDTO();
  usuarios: UsuarioResponseDTO[] = [];
  flagNoResults: boolean = false;
  flagLoading: boolean = false;
  ocultarBoton: boolean = true;
  totalUsuarios: number = 0;
  page: number = 0;

  constructor(private usuarioService: UsuarioService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.usuario;
    this.flagLoading = true;
    this.cargarUsuarios();
    /* this.usuarioService.getAll().subscribe((data: any) => {
      this.usuarios = data.usuarios;
      console.log("USUARIOS", this.usuarios);
      if (this.usuarios.length === 0) {
        this.flagNoResults = true;
        this.flagLoading = false;
        return;
      }
      this.flagNoResults = false;
      this.usuarios = this.usuarios.filter(a => a.id !== this.usuarioLogueado.id);
      this.flagLoading = false;
    }); */
  }

  public getImagen(u: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(u);
  }

  public deleteUsuario(id: string) {
    console.log("Entra a deleteUsuario ID=", id);
    this.usuarioService.deleteUsuarioById(id).subscribe((data: any) => {
      console.log(data);
    }, (err) => {console.log("ERR", err)});
  }

  public cargarUsuarios() {
    /* this.usuarioService.getAll().subscribe((data: any) => {
      this.usuarios = data.usuarios;
      console.log("USUARIOS", this.usuarios);
    }); */
    console.log("cargarUsuarios");
    this.usuarioService.getAllUsuariosPaginados(this.page).subscribe((data: any) => {
      this.usuarios = data.usuarios;
      console.log("USUARIOS", this.usuarios);
    });


    if (this.usuarios.length > 0) {
      this.flagLoading = true;
      this.usuarioService.getAllUsuariosPaginados(this.page).subscribe((data: any) => {
        let usuariosNuevos = data.usuarios;
        console.log("USUARIOS NUEVOS: ", usuariosNuevos);
        usuariosNuevos.forEach(p => this.usuarios.push(p));
        this.totalUsuarios = data.totalUsuarios;
        this.ocultarBoton = false;
        this.flagLoading = false;
        this.setFlagNoResults();
      }); 
    } else {
      this.flagNoResults = true;
    }
  }

  public cambiarPagina(page: number) {
    this.page = this.page + page;
    if (this.page > this.totalUsuarios) {
      Swal.fire('Atencion', 'No hay mas usuarios por ver!', 'info');
      return;
    }
    this.ocultarBoton = true;
    this.cargarUsuarios();
  }

  

  private setFlagNoResults() {
    if (this.usuarios.length === 0) {
      this.flagNoResults = true;
    }
  }
}
