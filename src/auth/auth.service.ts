import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegisterDTO } from './UserDTO/registerDTO';
import { UserBD, userBD } from './Model/userBD';
import { User } from './Model/user';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from './UserDTO/userDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private static idConter = 1;

    constructor(private readonly jwtService: JwtService) { }

    async register(registerDto: RegisterDTO): Promise<{ access_token: string }> {
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

        return this.geraToken(newUser)
    }


    async login(loginDTO: UserDTO): Promise<{ access_token: string }> {
        const existingUser = userBD.find((user) => user.email === loginDTO.email);

        if (!existingUser) {
            throw new UnauthorizedException('Email inválido');
        }

        const senhaCorreta = await bcrypt.compare(loginDTO.senha, existingUser.senha);

        if (!senhaCorreta) {
            throw new UnauthorizedException('Senha incorreta');
        }

        return this.geraToken(existingUser);
    }

    private async geraToken(user: User): Promise<{ access_token: string }> {
        const payload = {
            sub: user.id,
            email: user.email,
            nome: user.nome,
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            access_token: accessToken,
        }
    }
}