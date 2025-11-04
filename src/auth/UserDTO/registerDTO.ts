 import { IsDateString, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
 

export class RegisterDTO{

 @IsEmail()
    @IsNotEmpty({message: 'preencha o campo email!'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'preencha o campo senha'})
    @MaxLength(18, {message: 'senha deve conter no maximo 18 caracteres'})
    @MinLength(6, {message: 'senha deve conter no minimo 6 caracteres'})
    senha: string

    @IsNotEmpty({message: 'preencha o campo Nome'})
    nome: string;

    @IsDateString({}, {message:'informa sua data de nascimento YYYY-MM-DD'})
    nascimento: string;

    @IsNotEmpty({message:'preencha o campo CPF'})
    CPF:string;

    @IsNotEmpty({message:'preencha o campo CEP'})
    CEP:string;

    @IsNotEmpty({message:'preencha o campo telefone'})
    telefone:string;

    @IsNotEmpty({message:'preencha o campo de gosto Musical'})
    gostoMusical:string;

    @IsNotEmpty({message:'preencha o campo de seu artista favorito'})
    artistaFavorito:string;
}