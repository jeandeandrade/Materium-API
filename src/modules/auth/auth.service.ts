import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  gerarToken(payload: { sub: number; email: string; papel: string }) {
    return this.jwtService.sign(payload);
  }
}
