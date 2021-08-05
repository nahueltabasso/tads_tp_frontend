import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestDTO } from 'src/app/models/request.model';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  loginRequestDto: LoginRequestDTO = new LoginRequestDTO(); 
  auth2: any;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private ngZone: NgZone) {}

  ngOnInit(): void {
    this.renderButton();
    this.createForm();
    const email = localStorage.getItem('email');
    // Si el usuario marco la opcion 'Recuerdame' seteamos por defecto el email del usuario
    if (email != undefined && email != null && email != '') {
      this.formularioLogin.controls['email'].setValue(email);
      this.formularioLogin.controls['remember'].setValue(true);
    }
  }

  public createForm() {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  public login() {
    // Validamos si el formulario no es valido
    if (this.formularioLogin.invalid) return;

    const { email, password } = this.formularioLogin.value;
    this.loginRequestDto.email = email;
    this.loginRequestDto.password = password;
  
    this.authService.login(this.loginRequestDto).subscribe((data: any) => {
      if (this.formularioLogin.get('remember').value) {
        localStorage.setItem('email', this.loginRequestDto.email);
      } else {
        localStorage.removeItem('email');
      }
      this.authService.saveLocalStorage(data.token, data.usuario);
      if (data.primerLogin) {
        // Primera vez que el usuario se loguea en la aplicacion 
        // Se redirecciona al componente de CompletarPerfil por primera vez
        this.router.navigateByUrl('/dashboard/completar-perfil/' + data.usuario.id);
        return; 
      }
      // Si el login es exitoso redireccionamos al home
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }

  public renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 320,
      'height': 40,
      'longtitle': true,
      'theme': 'red',
    });

    this.startApp();
  }

  public startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1005407688819-djrnng2c8q7ask6frur93847le44et7v.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        var token = googleUser.getAuthResponse().id_token;
        let body = {
          "token": token
        }
        this.authService.googleLogin(body).subscribe((data: any) => {
          let usuario: UsuarioResponseDTO = data.usuario;
          this.authService.saveLocalStorage(data.token, data.usuario);
          if (usuario.primerLogin === 1) {
            // Primera vez que el usuario se loguea en la aplicacion mediante Google SignIn
            // Se redirecciona al componente de CompletarPerfil por primera vez
            this.ngZone.run(() => {
              this.router.navigateByUrl('/dashboard/completar-perfil');
              return; 
            });
          }
          // Si el login es exitoso redireccionamos al home
          this.ngZone.run(() => {
            this.router.navigateByUrl('/dashboard');
          });
        });
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }


}
