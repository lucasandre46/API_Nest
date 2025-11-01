import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class UserDTO {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(18, {message: 'senha deve conter no maximo 18 caracteres'})
    @MinLength(6, {message: 'senha deve conter no minimo 6 caracteres'})
    senha: string
}