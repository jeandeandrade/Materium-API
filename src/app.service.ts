import { Injectable } from '@nestjs/common';
import { UsuarioService } from './modules/usuario/usuario.service';
import { CreateUsuarioDto } from './modules/usuario/dto';

@Injectable()
export class AppService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async createUsuario(data: CreateUsuarioDto): Promise<any> {
    return this.usuarioService.create(data);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
