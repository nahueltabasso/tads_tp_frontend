import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MensajeChatRequestDTO } from 'src/app/models/request.model';
import { MensajeChatResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { MensajeChatService } from 'src/app/services/mensaje-chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, OnChanges {

  @Input('usuario') usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  flagUsuarioSeleccionado: boolean = true;
  usuarioLogueado: UsuarioResponseDTO = new UsuarioResponseDTO();
  mensajesChat: MensajeChatResponseDTO[] = [];
  mensajeNuevo: MensajeChatRequestDTO = new MensajeChatRequestDTO();
  formulario: FormGroup
  @ViewChild('scroll') myScrollContainer: ElementRef;
  flagMostrarEmojis: boolean = false;

  constructor(public webSocketService: WebSocketService,
              private authService: AuthService,
              private usuarioService: UsuarioService,
              private mensajeChatService: MensajeChatService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.usuarioLogueado = this.authService.usuario;
    this.webSocketService.receiveMessage().subscribe((data: MensajeChatResponseDTO) => {
      this.mensajesChat.push(data);
    });
    this.createForm();
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
    // this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    // console.log(this.scroll);
    this.cargarmensajes();
  }

  public getImagenPerfilUsuarioTo() {
    return this.usuarioService.getUrlImagen(this.usuario);
  }

  public createForm() {
    this.formulario = this.fb.group({
      mensaje: ['', ]
    });
  }

  public cargarmensajes() {
    this.mensajesChat = [];
    if (this.usuario !== null && this.usuario !== undefined) {
      this.mensajeChatService.getHistorialChat(this.usuario.id).subscribe((data: any) => {
        this.mensajesChat = data.mensajes;
      });
    }
  }

  public sendMessage() {
    this.mensajeNuevo.from = this.usuarioLogueado.id;
    this.mensajeNuevo.to = this.usuario.id;
    const { mensaje } = this.formulario.value;
    this.mensajeNuevo.message = mensaje;

    if (this.mensajeNuevo.message.length === 0) {
      return;
    }
    // Emitir un evento de socket al backend para enviar el mensaje privado
    this.webSocketService.sendMessage(this.mensajeNuevo);
    // Resetear el valor del campo
    this.formulario.controls['mensaje'].setValue('');
    this.mensajeNuevo = new MensajeChatRequestDTO();
    this.flagMostrarEmojis = false;
  }

  public getHoraMesFormat(fecha: Date) {
    const hoyMes = moment(fecha);
    return hoyMes.format('HH:mm a | MMMM Do');
  }

  public mostrarEmojis() {
    console.log("Click");
    this.flagMostrarEmojis = !this.flagMostrarEmojis;
    console.log(this.flagMostrarEmojis);
  }

  public addEmoji(event) {
    let data = this.formulario.get('mensaje');
    data.patchValue(data.value + event.emoji.native);
  }
}
