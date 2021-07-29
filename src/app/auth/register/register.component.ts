import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { UsuarioRegistroRequestDTO } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';
import { validEqualsPasswords } from 'src/app/shared/common-validators/common-validators';
import { DateValidator } from 'src/app/shared/common-validators/DateValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formularioRegistro: FormGroup;
  usuarioDto: UsuarioRegistroRequestDTO = new UsuarioRegistroRequestDTO();
  paises: string[] = [];
  recaptchaToken: string;
  fechaMaximaStr: string;

  constructor(private authService: AuthService,
              private recaptchaV3Service: ReCaptchaV3Service,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.createForm();
    this.loadFechasLimits();
    this.obtenerPaisesApi().subscribe(data => {
      this.completaArrayPaises(data);
    });
    this.executeRecaptchaV3();
  }

  public createForm() {
    this.formularioRegistro = this.fb.group({
      nombreApellido: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.required])],
      genero: [null, Validators.required],
      fechaNacimiento: ['', Validators.compose([Validators.required, DateValidator.validarFecha])],
      pais: [null, Validators.required],
      terminos: [false, Validators.required]
    }, {
      validators: validEqualsPasswords
    });
  }

  public loadFechasLimits() {
    // Para poder registrarse el usuario debera tener 13 años
    let cantMeses = 12 * 13;
    const fechaMaxima = new Date(new Date().getFullYear(), new Date().getMonth() - cantMeses, new Date().getDate() + 1);
    this.fechaMaximaStr = this.transformDate(fechaMaxima);
  }

  public executeRecaptchaV3() {
    this.recaptchaV3Service.execute('').subscribe(data => {
      this.recaptchaToken = data;
    });
  }

  public checkPassword(): boolean {
    return this.formularioRegistro.hasError('notEquals') &&
           this.formularioRegistro.get('password').dirty &&
           this.formularioRegistro.get('passwordConfirm').dirty;
  }

  public registrarNuevoUsuario() {
    if (this.formularioRegistro.invalid) return;
    
    const { nombreApellido, email, password, genero, fechaNacimiento, pais, terminos } = this.formularioRegistro.value;

    // Si terminos es igual a false mostrar mensaje de warning.
    if (!terminos) {
      Swal.fire('Atencion!', 'Debe aceptar los terminos y condiciones para poder registrarse', 'warning');
      return;
    }

    this.usuarioDto.nombreApellido = nombreApellido;
    this.usuarioDto.email = email;
    this.usuarioDto.password = password;
    this.usuarioDto.genero = genero;
    this.usuarioDto.pais = pais;
    this.usuarioDto.fechaNacimiento = fechaNacimiento;
    this.usuarioDto.primerLogin = 0;     // Por defecto al crearse este campo es 0

    this.authService.registrarUsuario(this.usuarioDto, this.recaptchaToken).subscribe((data: any) => {
      if (data.usuario.id != null || data.usuario.id != undefined) {
        // Implica que el usuario esta creado
        // Redireccionar al login y mostrar alerta 
        this.router.navigateByUrl('/login');
        const emailUsuario = data.usuario.email;
        Swal.fire('Activa tu Cuenta!', `Revisa la casilla de ${emailUsuario} para activar tu cuenta`, 'info');
      }
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }

  public obtenerPaisesApi(): Observable<any> {
    const url = 'https://restcountries.eu/rest/v1/all';
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.get<any>(url, { headers: headers });
  }

  public completaArrayPaises(data: any) {
    const size = data.length;
    for (let i = 0; i < size; i++) {
      const nombrePais = data[i].name;
      this.paises.push(nombrePais);
    }
  }

  public transformDate(date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
