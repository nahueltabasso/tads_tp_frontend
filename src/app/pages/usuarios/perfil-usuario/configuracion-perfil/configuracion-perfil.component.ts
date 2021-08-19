import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-configuracion-perfil',
  templateUrl: './configuracion-perfil.component.html',
  styleUrls: ['./configuracion-perfil.component.css']
})
export class ConfiguracionPerfilComponent implements OnInit {

  formularioDatosPersonales: FormGroup;
  comboEstadoSentimental: string[] = [];
  paises: string[] = [];
  imagenSeleccionada: File;
  imagenUrl: string;
  // flagFotoPerfil: boolean = false;
  @Input('usuarioLogueado') usuarioLogueado: UsuarioResponseDTO;

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private httpClient: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
    this.imagenUrl = this.usuarioService.getUrlImagen(this.usuarioLogueado);
    this.usuarioService.getEstadosCombo().subscribe((estados: any) => {
      this.comboEstadoSentimental = estados.estados;
    });
    this.obtenerPaisesApi().subscribe(data => {
      this.completaArrayPaises(data);
    });
  }

  public createForm() {
    this.formularioDatosPersonales = this.fb.group({
      nombreApellido: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      fechaNacimiento: [{value: '', disabled: true}],
      genero: [{value: '', disabled: true}],
      pais: ['', Validators.required],
      situacionSentimental: ['', Validators.required],
      telefono: ['', ],
      biografia: ['', ],
      hobbies: ['', ]
    });
  }

  public loadData() {
    this.formularioDatosPersonales.controls['nombreApellido'].setValue(this.usuarioLogueado.nombreApellido);
    this.formularioDatosPersonales.controls['email'].setValue(this.usuarioLogueado.email);
    this.formularioDatosPersonales.controls['fechaNacimiento'].setValue(this.transformDate(this.usuarioLogueado.fechaNacimiento));
    if (this.usuarioLogueado.genero === 'M') {
      this.formularioDatosPersonales.controls['genero'].setValue('M');
    } else {
      this.formularioDatosPersonales.controls['genero'].setValue('F');
    }
    this.formularioDatosPersonales.controls['pais'].setValue(this.usuarioLogueado.pais);
    this.formularioDatosPersonales.controls['situacionSentimental'].setValue(this.usuarioLogueado.situacionSentimental);
    this.formularioDatosPersonales.controls['telefono'].setValue(this.usuarioLogueado.telefono);
    this.formularioDatosPersonales.controls['biografia'].setValue(this.usuarioLogueado.biografia);
    this.formularioDatosPersonales.controls['hobbies'].setValue(this.usuarioLogueado.hobbies);
  }

  public transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  public obtenerPaisesApi(): Observable<any> {
    const url = 'https://restcountries.eu/rest/v1/all';
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.get<any>(url, { headers: headers });
  }

  public cambiarImagen(file: File) {
    this.imagenSeleccionada = file;
    if (this.imagenSeleccionada !== null && this.imagenSeleccionada !== undefined) {
      this.actualizarFotoPerfil();
    }
  }

  private actualizarFotoPerfil() {
    // Javascript Promise
    this.usuarioService.actualizarFotoPerfil(this.usuarioLogueado.id, this.imagenSeleccionada)
    .then((rta: any) => {
      this.usuarioLogueado = rta.usuario;
      this.imagenUrl = this.usuarioService.getUrlImagen(this.usuarioLogueado);
      this.usuarioLogueado.srcImagen = rta.nombreArchivo;
      // this.flagFotoPerfil = true;
      this.mostrarMensajeExito('Foto de Perfil!', 'La foto de perfil se ha actualizado correctamente!', 'success');
    });
  }

  public actualizarPerfil() {
    const { pais, situacionSentimental, telefono, biografia, hobbies } = this.formularioDatosPersonales.value;
    this.usuarioLogueado.pais = pais;
    this.usuarioLogueado.situacionSentimental = situacionSentimental;
    this.usuarioLogueado.telefono = telefono;
    this.usuarioLogueado.biografia = biografia;
    this.usuarioLogueado.hobbies = hobbies;
    this.usuarioService.actualizarPerfil(this.usuarioLogueado, this.usuarioLogueado.id).subscribe((data: any) => {
      this.usuarioLogueado = data.usuario;
      this.authService.usuario = this.usuarioLogueado;
      this.mostrarMensajeExito('Perfil Completado!', 'El perfil se ha actualizado correctamente!', 'success');
    }, (err) => {
      Swal.fire('Error!', 'Ocurrio un error! Consulte con el administrador!', 'error');
    });
  }

  private mostrarMensajeExito(titulo: string, msg: string, icon: SweetAlertIcon) {
    Swal.fire(titulo, msg, icon);
  }

  public completaArrayPaises(data: any) {
    const size = data.length;
    for (let i = 0; i < size; i++) {
      const nombrePais = data[i].name;
      this.paises.push(nombrePais);
    }
  }

}
