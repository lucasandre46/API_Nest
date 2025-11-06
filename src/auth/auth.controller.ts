import { Controller, Param, Get, NotFoundException, Post, Body  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './UserDTO/registerDTO';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {

     return this.authService.register(registerDTO);

  }


   }
  