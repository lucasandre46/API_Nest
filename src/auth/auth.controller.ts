import { Controller, Param, Get, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';



@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get()
  loginUser() {}


   }
  