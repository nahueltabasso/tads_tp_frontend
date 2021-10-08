import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioResponseDTO } from '../models/response.model';
import { AuthService } from '../services/auth.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, OnDestroy {

  usuarioLogueado: UsuarioResponseDTO = new UsuarioResponseDTO();

  constructor(public webSocketService: WebSocketService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.webSocketService.setUpSocketConnection();
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

}
