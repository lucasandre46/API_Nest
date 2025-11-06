import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './UserDTO/registerDTO';
import { UserBD, userBD } from './Model/userBD';
import { ConflictException } from '@nestjs/common';
import { User } from './Model/user';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    private static idConter = 1;

    async register(registerDto: RegisterDTO): Promise<Omit<User, 'senha' | 'CPF' | 'CEP'>>{
        const existUser = userBD.find(
            (user) => user.email === registerDto.email,
        );

        if (existUser) {
            throw new ConflictException('O e-mail fornecido já está em uso');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(registerDto.senha, salt);
        const hashedCPF = await bcrypt.hash(registerDto.CPF, salt);
        const hashedCEP = await bcrypt.hash(registerDto.CEP, salt);

        const newUser: User = {
            id: AuthService.idConter++,
            email: registerDto.email,
            nome: registerDto.nome,
            senha: hashedSenha,
            CPF: hashedCPF,
            CEP: hashedCEP,
            nascimento: registerDto.nascimento,
            telefone: registerDto.telefone,
            gostoMusical: registerDto.gostoMusical,
            artistaFavorito: registerDto.artistaFavorito
        
        };

        userBD.push(newUser);

        const{ senha, CPF, CEP, ...result} = newUser
        return result;
    }


  
}