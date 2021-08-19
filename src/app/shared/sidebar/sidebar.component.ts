import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];
  imgUrl: string = '';
  usuario: UsuarioResponseDTO = new UsuarioResponseDTO();
  url: string = environment.server_url + '/file';

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario
    this.imgUrl = this.getUrlImagen();
    this.authService.getMenu(this.usuario.rol.nombreRol).subscribe((data: any) => {
      this.menuItems = data.menu;
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  private getUrlImagen() {
    if (this.usuario.google) 
    {
      if (this.usuario.srcImagen.includes('https')) {
        return this.usuario.srcImagen;
      }
    }

    if (!this.usuario.srcImagen) {
        return `${this.url}/perfiles/no-image.png`;
    } 
    return `${this.url}/perfiles/${this.usuario.srcImagen}`;
  }

}
