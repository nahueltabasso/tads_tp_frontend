import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-completar-perfil',
  templateUrl: './completar-perfil.component.html',
  styleUrls: ['./completar-perfil.component.css']
})
export class CompletarPerfilComponent implements OnInit {

  formularioDatosPersonales: FormGroup;
  formularioFotoPerfil: FormGroup;
  isOptional = false;
  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  comboEstadoSentimental: string[] = [];
  imagenSeleccionada: File;
  imagenUrl: string;
  flagFotoPerfil: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.createForm();

    this.activatedRoute.paramMap.subscribe(params => {
      const id: string = params.get('id');
      this.usuarioService.getUsuarioById(id).subscribe((data: any) => {
        this.usuario = data.usuario;

        if (this.usuario.primerLogin > 1) {
          this.router.navigateByUrl('/dashboard');
          return;
        }
        this.loadData();
        this.usuarioService.getEstadosCombo().subscribe((estados: any) => {
          this.comboEstadoSentimental = estados.estados;
        });
      });
    });

  }

  public createForm() {
    this.formularioDatosPersonales = this.fb.group({
      nombreApellido: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      fechaNacimiento: [{value: '', disabled: true}],
      genero: [{value: '', disabled: true}],
      pais: [{value: '', disabled: true}],
      situacionSentimental: ['', ],
      telefono: ['', ],
      biografia: ['', ],
      hobbies: ['', ]
    });

    this.formularioFotoPerfil = this.fb.group({});
  }

  public loadData() {
    this.formularioDatosPersonales.controls['nombreApellido'].setValue(this.usuario.nombreApellido);
    this.formularioDatosPersonales.controls['email'].setValue(this.usuario.email);
    this.formularioDatosPersonales.controls['fechaNacimiento'].setValue(this.transformDate(this.usuario.fechaNacimiento));
    if (this.usuario.genero === 'M') {
      this.formularioDatosPersonales.controls['genero'].setValue('Masculino');
    } else {
      this.formularioDatosPersonales.controls['genero'].setValue('Femenino');
    }
    this.formularioDatosPersonales.controls['pais'].setValue(this.usuario.pais);
    this.formularioDatosPersonales.controls['situacionSentimental'].setValue(null);
  }

  public completarPerfil() {
    const { situacionSentimental, telefono, biografia, hobbies } = this.formularioDatosPersonales.value;
    this.usuario.situacionSentimental = situacionSentimental;
    this.usuario.telefono = telefono;
    this.usuario.biografia = biografia;
    this.usuario.hobbies = hobbies;
    this.usuarioService.actualizarPerfil(this.usuario, this.usuario.id).subscribe((data: any) => {
      this.usuario = data.usuario;
      this.authService.usuario = this.usuario;
      this.mostrarMensajeExito('Perfil Completado!', 'El perfil se ha actualizado correctamente!', 'success');
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      console.log('erro', err);
      Swal.fire('Error!', 'Ocurrio un error! Consulte con el administrador!', 'error');
    });
  }

  private actualizarFotoPerfil() {
    // Javascript Promise
    this.usuarioService.actualizarFotoPerfil(this.usuario.id, this.imagenSeleccionada)
    .then((rta: any) => {
      this.usuario = rta.usuario;
      this.imagenUrl = this.usuarioService.getUrlImagen(this.usuario);
      this.authService.usuario = this.usuario;
      this.flagFotoPerfil = true;
      this.mostrarMensajeExito('Foto de Perfil!', 'La foto de perfil se ha actualizado correctamente!', 'success');
    });
  }

  private mostrarMensajeExito(titulo: string, msg: string, icon: SweetAlertIcon) {
    Swal.fire(titulo, msg, icon);
  }

  public cambiarImagen(file: File) {
    this.imagenSeleccionada = file;
    if (this.imagenSeleccionada !== null && this.imagenSeleccionada !== undefined) {
      this.actualizarFotoPerfil();
    }
  }

  public transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

}