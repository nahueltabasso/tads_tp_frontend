import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioResponseDTO } from 'src/app/models/response.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usuario: UsuarioResponseDTO = null;

  constructor() {}

  ngOnInit(): void {
  }

  actualizarUsuarioSeleccionadoForChat(event) {
    this.usuario = event;
  }
}
