import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { validEqualsPasswords } from 'src/app/shared/common-validators/common-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  path: UrlTree;
  token: any;
  formularioResetPassword: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.path = this.router.parseUrl(this.router.url);
    this.token = this.path.queryParams['token'];
    if (this.token === '' || this.token === undefined || this.token === null) {
      // MOSTRAR CARTEL DE ADVERTENCIA Y REDIRECCIONAR AL LOGIN
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

    console.log(this.token);
    console.log(this.formularioResetPassword.value);
  }
}
