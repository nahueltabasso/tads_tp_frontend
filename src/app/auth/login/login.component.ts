import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestDTO } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  loginRequestDto: LoginRequestDTO = new LoginRequestDTO(); 

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.createForm();
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
        this.router.navigateByUrl('/dashboard/completar-perfil');
        return; 
      }
      // Si el login es exitoso redireccionamos al home
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }
}
