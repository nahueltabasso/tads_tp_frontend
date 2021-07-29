import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { ResetPasswordDTO } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';
import { validEqualsPasswords } from 'src/app/shared/common-validators/common-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  path: UrlTree;
  token: any;
  formularioResetPassword: FormGroup;
  passwordDto: ResetPasswordDTO = new ResetPasswordDTO();

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.path = this.router.parseUrl(this.router.url);
    this.token = this.path.queryParams['token'];
    if (this.token === '' || this.token === undefined || this.token === null) {
      // MOSTRAR CARTEL DE ADVERTENCIA Y REDIRECCIONAR AL LOGIN
      Swal.fire('Cuidado!', 'El token es requerido. Vuelva a solicitarlo!', 'warning');
      this.router.navigateByUrl('/forgot-password');
    }
    this.createForm();    
  }

  public createForm() {
    this.formularioResetPassword = this.fb.group({
      password: ['', Validators.compose([Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.required])]
    }, {
      validators: validEqualsPasswords
    });
  }

  public checkPassword(): boolean {
    return this.formularioResetPassword.hasError('notEquals') &&
           this.formularioResetPassword.get('password').dirty &&
           this.formularioResetPassword.get('passwordConfirm').dirty;
  }

  public resetPassword() {
    if (this.formularioResetPassword.invalid) return;

    const { password } = this.formularioResetPassword.value;
    this.passwordDto.newPassword = password;
    this.passwordDto.resetToken = this.token;

    this.authService.resetPassword(this.passwordDto).subscribe((data: any) => {
      if (data.ok) {
        Swal.fire('Exito!', data.msg, 'success');
      }
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }
}
