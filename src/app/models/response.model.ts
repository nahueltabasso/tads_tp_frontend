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

    get imagenUrl() {
        if (this.google) {
            if (this.srcImagen.includes('https')) {
                return this.srcImagen;
            }
        }
        console.log(this.srcImagen);
        if (!this.srcImagen) {
            console.log("llega")
            return `${url}/perfiles/no-image.png`;
        } 
        console.log("aca")
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
    srcImagen: string;
    createAt: Date;
    usuario: UsuarioResponseDTO;
}
