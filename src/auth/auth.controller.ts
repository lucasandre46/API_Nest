import { Controller, Param, Get, NotFoundException, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './UserDTO/registerDTO';
import { UserDTO } from './UserDTO/userDTO';
import { PassThrough } from 'stream';
import type { Response } from 'express'



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerDTO: RegisterDTO) {

    const { access_token } = await this.authService.register(registerDTO);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 1,
    })

    return { message: 'Cadastro realizado com sucesso', access_token };

  }

  @Post('login')
  async login(@Body() loginDTO: UserDTO) {

    return this.authService.login(loginDTO)

  }


}
