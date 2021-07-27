import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  loginRequestDTO: any; 

  constructor(private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  public login() {
    if (this.formularioLogin.invalid) return;
    console.log(this.formularioLogin.value);
    this.router.navigateByUrl('/dashboard');
  }
}
