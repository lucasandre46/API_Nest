import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class UserDTO {
    @IsEmail()
    @IsNotEmpty({message: 'preencha o campo email!'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'preencha o campo senha'})
    @MaxLength(18, {message: 'senha deve conter no maximo 18 caracteres'})
    @MinLength(6, {message: 'senha deve conter no minimo 6 caracteres'})
    senha: string
}