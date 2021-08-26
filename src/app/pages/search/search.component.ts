import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitudAmistadRequestDTO } from 'src/app/models/request.model';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formulario: FormGroup;
  usuariosResult: UsuarioResponseDTO[] = [];
  loading: boolean = false;
  termino: string = '';
  currentDate: Date = new Date();
  click: number = 0;
  usuarioLogueado: UsuarioResponseDTO = new UsuarioResponseDTO();

  constructor(private usuarioService: UsuarioService,
              private solicitudService: SolicitudService,
              private authService: AuthService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.usuario;
    this.createForm();
  }

  public createForm() {
    this.formulario = this.fb.group({
      search: ['', ]
    });
  }

  public search() {
    this.click++;
    this.loading = true;
    setTimeout(() => {
      this.usuarioService.searchByTermino(this.termino).subscribe((data: any) => {
        this.usuariosResult = data.usuarios;
        this.loading = false;
      });
        
    }, 500);
  }

  public getImagen(u: UsuarioResponseDTO) {
    return this.usuarioService.getUrlImagen(u);
  }

  public enviarSolicitudDeAmistad(usuario: UsuarioResponseDTO) {
    let solicitud = new SolicitudAmistadRequestDTO();
    solicitud.emailEmisor = this.authService.usuario.email;
    solicitud.usuarioEmisor = this.authService.usuario.id;
    solicitud.emailReceptor = usuario.email;
    solicitud.usuarioReceptor = usuario.id;
  console.log(solicitud);
    this.solicitudService.enviarSolicitudAmistad(solicitud).subscribe(data => {
      Swal.fire('Enviada!', 'Solicitud enviada!', 'success');
    }, (err) => {
      console.log(err);
      Swal.fire('Atencion!', err.error.msg, 'info');
    });
  }
}
