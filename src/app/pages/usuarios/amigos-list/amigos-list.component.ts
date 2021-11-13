import { Component, OnInit } from '@angular/core';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-amigos-list',
  templateUrl: './amigos-list.component.html',
  styleUrls: ['./amigos-list.component.css']
})
export class AmigosListComponent implements OnInit {

  usuarioLogueado: UsuarioResponseDTO = new UsuarioResponseDTO();
  amigos: UsuarioResponseDTO[] = [];
  flagNoResults: boolean = false;
  flagLoading: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.usuario;
    this.flagLoading = true;
    this.usuarioService.getAmigos(this.usuarioLogueado.id).subscribe((data: any) => {
      this.amigos = data.amigos;
      if (this.amigos.length === 0) {
        this.flagNoResults = true;
        this.flagLoading = false;
        return;
      }
      this.flagNoResults = false;
      this.amigos = this.amigos.filter(a => a.id !== this.usuarioLogueado.id);
      this.flagLoading = false;
    });
  }

  public getImagen(u: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(u);
  }

}
