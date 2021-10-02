import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosConectados: UsuarioResponseDTO[] = [];
  flagUsuariosConectadosEmpty: boolean = false;
  @Output() usuarioSeleccionado: EventEmitter<UsuarioResponseDTO>;

  constructor(public usuarioService: UsuarioService) {
    this.usuarioSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data: any) => {
      this.usuariosConectados = data.usuarios;
      if (this.usuariosConectados.length === 0) {
        this.flagUsuariosConectadosEmpty = true;
      }
    });
  }

  public seleccionarUsuarioForChat(usuario: UsuarioResponseDTO) {
    this.usuarioSeleccionado.emit(usuario);
  }

}
