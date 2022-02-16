import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ComentarioResponseDTO, PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';
import { ComentarioRequestDTO } from 'src/app/models/request.model';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input('publicacion') publicacion: PublicacionResponseDTO;
  @Input('usuario') usuario: UsuarioResponseDTO;
  formulario: FormGroup;
  usuariosResult: UsuarioResponseDTO[] = [];
  loading: boolean = false;
  comentario: string = '';
  currentDate: Date = new Date();
  click: number = 0;
  usuarioLogueado: UsuarioResponseDTO = new UsuarioResponseDTO();
  mostrarComentarioRojo: boolean = false;
  totalCantidadComentarios: number = 0;
  comentarioRequestDTO: ComentarioRequestDTO = new ComentarioRequestDTO();
  comentarioResponseDTO: ComentarioResponseDTO = new ComentarioResponseDTO();


  constructor(private usuarioService: UsuarioService,
              private authService: AuthService,
              private fb: FormBuilder,
              private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.usuario;
    this.createForm();
    
    this.publicacionService.getCantidadComentariosByPublicacion(this.publicacion.id).subscribe((result: any) => {
      this.totalCantidadComentarios = result.cantComentarios;
    });
  }

  public createForm() {
    this.formulario = this.fb.group({
      comentario: ['', ]
    });
  }

  public comentar() {
    if (this.comentario === '') {
      return;
    }
    this.comentarioRequestDTO.usuario = this.usuario.id;
    this.comentarioRequestDTO.publicacion = this.publicacion.id;
    this.comentarioRequestDTO.comentario = this.comentario;
    console.log(this.comentarioRequestDTO);
    this.publicacionService.registrarComentarioPublicacion(this.comentarioRequestDTO).subscribe((data: any) => {
      Swal.fire('Comentario', 'Se registró el comentario', 'success');
      this.totalCantidadComentarios++;
      this.comentarioResponseDTO = data.comentario;
      this.comentario = '';
      this.formulario.controls['comentario'].setValue('');
      console.log('OK', this.comentarioResponseDTO);
    }, (err) => {
      console.error(err);
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  public displayText() {
    if (this.totalCantidadComentarios > 0) {
      return `Comentarios (${this.totalCantidadComentarios})`;
    } else {
      return 'Comentarios';
    }
  }
  

}
