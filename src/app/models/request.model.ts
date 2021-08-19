export class LoginRequestDTO {
    email: string;
    password: string;
}

export class UsuarioRegistroRequestDTO {
    nombreApellido: string;
    email: string;
    password: string;
    genero: string;
    fechaNacimiento: Date;
    pais: string;
    primerLogin: number;
}

export class ResetPasswordDTO {
    newPassword: string;
    resetToken: string;
}
