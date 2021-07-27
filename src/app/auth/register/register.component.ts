import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validEqualsPasswords } from 'src/app/shared/common-validators/common-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formularioRegistro: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formularioRegistro = this.fb.group({
      nombreApellido: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.required])],
      genero: [null, Validators.required],
      fechaNacimiento: ['', Validators.required],
      pais: [null, Validators.required],
      terminos: [false, Validators.required]
    }, {
      validators: validEqualsPasswords
    });
  }

  public checkPassword(): boolean {
    return this.formularioRegistro.hasError('notEquals') &&
           this.formularioRegistro.get('password').dirty &&
           this.formularioRegistro.get('passwordConfirm').dirty;
  }

  public registrarNuevoUsuario() {
    console.log(this.formularioRegistro.valid);
    console.log(this.formularioRegistro.value);
  }
}
