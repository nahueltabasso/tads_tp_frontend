import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosConectados: UsuarioResponseDTO[] = [];
  usuariosActivosObs: Observable<UsuarioResponseDTO[]>;
  flagUsuariosConectadosEmpty: boolean = false;
  date: Date = new Date();
  @Output() usuarioSeleccionado: EventEmitter<UsuarioResponseDTO>;

  constructor(public usuarioService: UsuarioService,
              private webSocketService: WebSocketService) {
    this.usuarioSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
    this.webSocketService.setUpSocketConnection();
    // this.usuarioService.getAll().subscribe((data: any) => {
    // });
    this.webSocketService.getUsuariosConectados().subscribe((data: any) => {
      this.usuariosConectados = data;
      this.usuariosActivosObs = data;
      if (this.usuariosConectados.length === 0) {
        this.flagUsuariosConectadosEmpty = true;
      }
    });
  }

  public seleccionarUsuarioForChat(usuario: UsuarioResponseDTO) {
    this.usuarioSeleccionado.emit(usuario);
  }

}
