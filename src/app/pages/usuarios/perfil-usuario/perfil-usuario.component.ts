import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  imagenUrl: string;
  flagBotonAgregarAmigo: boolean = true;

  constructor(private authService: AuthService,
              private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: string = params.get('id');
      if (id !== null && id !== undefined && id !== '') {
        // Implica que es el perfil de otro usuario
        this.usuarioService.getUsuarioById(id).subscribe((data: any) => {
          this.usuario = data.usuario;
        });
      } else {
        // Implica que es el perfil del usuario logueado
        this.usuario = this.authService.usuario;
        this.imagenUrl = this.usuarioService.getUrlImagen(this.usuario);
        this.flagBotonAgregarAmigo = false;
      } 
    });

  }



}
