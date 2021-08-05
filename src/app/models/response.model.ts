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