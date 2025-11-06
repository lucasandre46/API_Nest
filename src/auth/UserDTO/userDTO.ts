import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class UserDTO {
    @IsEmail()
    @IsNotEmpty({message: 'preencha o campo email!'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'preencha o campo senha'})
    senha: string
}