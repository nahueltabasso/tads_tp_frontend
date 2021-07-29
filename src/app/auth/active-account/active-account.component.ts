import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {

  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  token: string;
  path: UrlTree;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.path = this.router.parseUrl(this.router.url);
    this.token = this.path.queryParams['token'];
    if (this.token === '' || this.token === undefined || this.token === null) {
      // MOSTRAR CARTEL DE ADVERTENCIA Y REDIRECCIONAR AL LOGIN
      Swal.fire('Error!', 'Ocurrio un error!', 'error');
      this.router.navigateByUrl('/login');
    }
    this.activarCuenta();
  }

  public activarCuenta() {
    this.authService.activarCuenta(this.token).subscribe((data: any) => {
      console.log(data.usuario);
      this.usuario = data.usuario;
      console.log(this.usuario);
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }

  public redireccionarLogin() {
    this.router.navigateByUrl('/login');
  }

}
