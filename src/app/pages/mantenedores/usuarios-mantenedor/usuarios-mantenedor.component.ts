import { Component, OnInit } from '@angular/core';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private usuarioService: UsuarioService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.usuario;
    this.flagLoading = true;
    this.usuarioService.getAll().subscribe((data: any) => {
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
    });
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

}
