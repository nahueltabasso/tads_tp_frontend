import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { MensajesComponent } from './mensajes/mensajes.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();

  constructor() {}

  ngOnInit(): void {
  }

  actualizarUsuarioSeleccionadoForChat(event) {
    this.usuario = event;
  }
}
