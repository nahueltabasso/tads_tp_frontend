import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicaciones-add',
  templateUrl: './publicaciones-add.component.html',
  styleUrls: ['./publicaciones-add.component.css']
})
export class PublicacionesAddComponent implements OnInit {

  formulario: FormGroup;
  usuarioLogueado: UsuarioResponseDTO = new UsuarioResponseDTO();
  publicacion: PublicacionResponseDTO = new PublicacionResponseDTO();
  imagenSeleccionada: File;
  imagenUrl: string;
  imagenUrlTemp: any;
  flagImagen: boolean = false;

  constructor(private publicacionService: PublicacionService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.usuario;
    this.createForm();
  }

  public createForm() {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  public subirPublicacion() {
    if (this.formulario.invalid) return;

    if (!this.imagenSeleccionada) {
      Swal.fire('Atencion', 'Falta la imagen de la publicacion', 'warning');
      return;
    }

    const { titulo, descripcion } = this.formulario.value;
    this.publicacion.titulo = titulo;
    this.publicacion.descripcion = descripcion;
    // Seteamos el usuario de la publicacion -> usuario logueado
    this.publicacion.usuario = this.usuarioLogueado;
    this.publicacionService.registrarPublicacion(this.publicacion, this.imagenSeleccionada).subscribe((data: any) => {
      if (data.ok) {
        Swal.fire('Subido!', 'Publicacion subida correctamente!', 'success');
        this.router.navigateByUrl('/dashboard/mi-perfil');
      }
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    })

  }

  public cambiarImagen(file: File) {
    this.imagenSeleccionada = file;
    if (!file) return;
    
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenUrlTemp = reader.result;
    }

  }

}
