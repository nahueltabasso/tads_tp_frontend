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
  ocultarBotonSiguiente: boolean = false;
  ocultarBotonAnterior: boolean = true;
  totalUsuarios: number = 0;
  page: number = 0;

  constructor(private usuarioService: UsuarioService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.usuario;
    this.flagLoading = true;
    this.usuarioService.getAllUsuariosPaginados(this.page).subscribe((data: any) => {
      this.usuarios = data.usuarios;
      this.totalUsuarios = data.totalUsuarios;
      this.cargarUsuarios();
    });
    
  }

  public getImagen(u: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(u);
  }

  public deleteUsuario(id: string) {
    this.usuarioService.deleteUsuarioById(id).subscribe((data: any) => {
      Swal.fire('Eliminado!', 'Usuario eliminado con exito!', 'success');
      this.usuarios = this.usuarios.filter(p => p.id !== id);
    }, (err) => {
      Swal.fire('Error!', `${err.error.msg}`, 'error');
    });
  }

  public cargarUsuarios() {
    if (this.usuarios.length > 0) {
      this.flagLoading = false;
      this.usuarios = [];
      this.usuarioService.getAllUsuariosPaginados(this.page).subscribe((data: any) => {
        let usuariosNuevos = data.usuarios;
        usuariosNuevos.forEach(p => this.usuarios.push(p));
        this.totalUsuarios = data.totalUsuarios;
        this.flagLoading = false;
        this.flagNoResults = false;
        this.usuarios = this.usuarios.filter(a => a.id !== this.usuarioLogueado.id);
      }); 
    } else {
      this.flagNoResults = true;
    }
  }

  public cambiarPagina(page: number) {
    this.page = this.page + page;
    this.page === 0 ? this.ocultarBotonAnterior = true : this.ocultarBotonAnterior = false;
    this.page + page > this.totalUsuarios ? this.ocultarBotonSiguiente = true : this.ocultarBotonSiguiente = false;
    this.cargarUsuarios();
  }
}
