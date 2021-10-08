import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { MensajeChatRequestDTO } from '../models/request.model';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socket;
  public socketStatus: boolean = false;

  constructor(private router: Router) {
  }
  
  setUpSocketConnection() {
    this.socket = io(environment.ws_server, {
      auth: {
        token: localStorage.getItem('auth_token') 
      }
    });
  }

  getUsuariosConectados() {
    console.log('llega');
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
