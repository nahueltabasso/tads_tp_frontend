import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formularioForgotPassword: FormGroup;

  constructor(private fb: FormBuilder) {}

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

    console.log(this.formularioForgotPassword.value);
  }

}
