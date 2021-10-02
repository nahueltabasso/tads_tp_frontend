import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioResponseDTO } from 'src/app/models/response.model';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, OnChanges {

  @Input('usuario') usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  flagUsuarioSeleccionado: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Se inicia el componente de mensajes');
  }
  
  ngOnChanges(changes: SimpleChanges) {
    let change;
    for (const propName in changes) {
      change = changes[propName];
    }
    this.usuario = JSON.parse(JSON.stringify(change.currentValue));
    if (this.usuario !== null && this.usuario !== undefined) {
      this.flagUsuarioSeleccionado = false;
    }

    this.cargarmensajes();
  }


  cargarmensajes() {
    if (this.usuario !== null && this.usuario !== undefined) {
      console.log("Prueba")
    }
  }
}
