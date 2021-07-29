import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formularioForgotPassword: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formularioForgotPassword = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  public solicitarCambioPassword() {
    if (this.formularioForgotPassword.invalid) return;

    const { email } = this.formularioForgotPassword.value;

    this.authService.forgotPassword(email).subscribe((data: any) => {
      if (data.ok) {
        // Implica que el estado de la respuesta HTTP es ok 
        // Mostrar mensaje y redireccionar
        Swal.fire('Email enviado', 'Revisa tu correo electronico para poder modificar tu contraseña', 'success');
        this.router.navigateByUrl('/login');        
      }
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }

}
