import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'tads-client';

  constructor(public webSocketService: WebSocketService) {}

  ngOnInit() {
    console.log(this.webSocketService)
  }
}
