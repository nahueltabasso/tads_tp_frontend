import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { MensajeChatRequestDTO } from '../models/request.model';
import { UsuarioResponseDTO } from '../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socket;
  public socketStatus: boolean = false;
  public amigosOnline: UsuarioResponseDTO[] = [];

  constructor(private router: Router) {
  }
  
  setUpSocketConnection() {
    this.socket = io(environment.ws_server, {
      auth: {
        token: localStorage.getItem('auth_token') 
      }
    });
    this.getUsuariosConectados().subscribe((data: any) => {
      this.amigosOnline = data
    });
  }

  getUsuariosConectados() {
    return new Observable(obs => {
      this.socket.on('lista-usuarios-online', (usuarios) => {
        console.log('llega al socket');
        obs.next(usuarios);
      });
    });
  }

  sendMessage(message: MensajeChatRequestDTO) {
    if (this.socket) {
      this.socket.emit('mensaje-privado', { message: message });
    }
  }

  receiveMessage() {
    if (!this.socket) return;
    return new Observable(obs => {
      this.socket.on('mensaje-privado', (message) => {
        obs.next(message);
      });
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }


}
