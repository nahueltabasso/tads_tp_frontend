import { environment } from "src/environments/environment";

const url = environment.server_url;

export class UsuarioResponseDTO {
    id: string;
    nombreApellido: string;
    email: string;
    password: string;
    telefono: string;
    fechaNacimiento: Date;
    genero: string;
    srcImagen: string;
    biografia: string;
    hobbies: string;
    estado: boolean;
    google: boolean;
    facebook: boolean;
    admin: boolean;
    createAt: Date;
    rol: RolResponseDTO;
    pais: string;
    primerLogin: number;
    situacionSentimental: string;
    online: boolean;

    get imagenUrl() {
        if (this.google) {
            if (this.srcImagen.includes('https')) {
                return this.srcImagen;
            }
        }
        console.log(this.srcImagen);
        if (!this.srcImagen) {
            return `${url}/perfiles/no-image.png`;
        } 
        return `${url}/perfiles/${this.srcImagen}`;
    }
}

export class RolResponseDTO {
    id: string;
    nombreRol: string;
    createAt: Date;
}

export class PublicacionResponseDTO {
    id: string;
    titulo: string;
    descripcion: string;
    srcImagen: string[];
    srcImagenWeb: string[];
    srcImagenMobile: string[];
    createAt: Date;
    usuario: UsuarioResponseDTO;
}

export class SolicitudAmistadResponseDTO {
    id: string;
    usuarioEmisor: UsuarioResponseDTO;
    emailEmisor: string;
    usuarioReceptor: UsuarioResponseDTO;
    emailReceptor: string;
    estado: boolean;
    createAt: any;
}

export class ReaccionDTO {
    id: string;
    usuario: UsuarioResponseDTO;
    publicacion: PublicacionResponseDTO;
    createAt: Date;
}

export class MensajeChatResponseDTO {
    id: string;
    from: UsuarioResponseDTO;
    to: UsuarioResponseDTO;
    mmessage: string;
    createAt: Date;
}