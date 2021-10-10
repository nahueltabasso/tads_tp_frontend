import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionResponseDTO, UsuarioResponseDTO } from 'src/app/models/response.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicacion-add-multiple',
  templateUrl: './publicacion-add-multiple.component.html',
  styleUrls: ['./publicacion-add-multiple.component.css']
})
export class PublicacionAddMultipleComponent implements OnInit {

  @Input('urlImagen') imgUrl;
  @Input('usuarioLogueado') usarioLogueado: UsuarioResponseDTO;
  @Input('isUsuarioLogueado') isUsuarioLogueado: boolean;
  @Output() publicacionRegistrada: EventEmitter<PublicacionResponseDTO>;
  flagShowImages: boolean = false;
  urlsFiles = [];
  filesSelect: FileList[] = [];
  files: File[] = [];
  formulario: FormGroup;
  publicacion: PublicacionResponseDTO = new PublicacionResponseDTO();

  constructor(private publicacionService: PublicacionService,
              private fb: FormBuilder) {
    this.publicacionRegistrada = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  public selectedFiles(event: any) {
    if (event.target.files) {
      this.filesSelect.push(event.target.files);

      this.flagShowImages = true;
      const numberOfFiles = this.filesSelect.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const cantidadArchivos = this.filesSelect[i].length;
        for (let k = 0; k < cantidadArchivos; k++) {
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[k]);
          reader.onload = (events: any) => {
            if (!this.urlsFiles.includes(events.target.result)) {
              this.urlsFiles.push(events.target.result);
            }
          }
        }
      }
    }
  }

  public publicar() {
    if (this.formulario.invalid) return;
    const { titulo, descripcion } = this.formulario.value;

    this.publicacion.titulo = titulo;
    this.publicacion.descripcion = descripcion;
    this.publicacion.usuario = this.usarioLogueado;

    if (this.filesSelect.length > 0) {
      const lengthFileSelect = this.filesSelect.length;
      for (let i = 0; i < lengthFileSelect; i++) {
        const cantidadArchivos = this.filesSelect[i].length;
        for (let k = 0; k < cantidadArchivos; k++) {
          let file = this.filesSelect[i][k];
          this.files.push(file);
        }
      }
    }

    if (this.files !== undefined && this.files.length === 1) {
      this.registrarPublicacionSingleFile();
    } else {
      console.log("entra");
      this.registrarPublicacionMultipleFiles();
    }
  }

  private registrarPublicacionSingleFile() {
    const file = this.files[0];
    this.publicacionService.registrarPublicacion(this.publicacion, file).subscribe((data: any) => {
      this.publicacion = data.publicacion;
      this.filesSelect = [];
      this.urlsFiles = [];
      this.files = [];
      this.flagShowImages = false;
      this.formulario.reset();
      this.formulario.controls['titulo'].setValue('');
      this.formulario.controls['descripcion'].setValue('');
      Swal.fire('Subida!', 'Publicacion subida correctamente', 'success');
      this.publicacionRegistrada.emit(this.publicacion);
    });
  }

  private registrarPublicacionMultipleFiles() {
    this.publicacionService.registrarPublicacionWithMultipleFiles(this.publicacion, this.files).subscribe((data: any) => {
      this.publicacion = data.publicacion;
      this.filesSelect = [];
      this.urlsFiles = [];
      this.files = [];
      this.flagShowImages = false;
      this.formulario.reset();
      this.formulario.controls['titulo'].setValue('');
      this.formulario.controls['descripcion'].setValue('');
      Swal.fire('Subida!', 'Publicacion subida correctamente', 'success');
      this.publicacionRegistrada.emit(this.publicacion);
    });
  }
}
