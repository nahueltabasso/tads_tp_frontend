import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socketStatus: boolean = false;

  constructor(private socket: Socket,
              private router: Router) {
    console.log("Se genera la instancia")
  }

  
  checkStatus() {
    this.socket.on('connection', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnection', () => {
      console.log('Desconectado del Servidor');
      this.socketStatus = false;
    });
  }
}
