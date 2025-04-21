import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from '../../prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id, // Combinação de resistência a GPU e side-channel attacks
      timeCost: 3, // Número de iterações
      memoryCost: 4096, // Memória em KiB
      parallelism: 1, // Threads paralelas
    });
  }

  async create(data: CreateUsuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (usuarioExistente) {
      throw new BadRequestException('Email já está em uso');
    }

    const hashedSenha = await this.hashPassword(data.senha);

    return this.prisma.usuario.create({
      data: {
        email: data.email,
        nome: data.nome,
        senha: hashedSenha,
        papel: data.papel,
      },
    });
  }

  async login({ email, senha }: { email: string; senha: string }) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaCorreta = await argon2.verify(usuario.senha, senha);

    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.authService.gerarToken({
      sub: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    });

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
      },
    };
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async update(id: number, data: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (data.senha) {
      data.senha = await this.hashPassword(data.senha);
    }

    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.usuario.delete({ where: { id } });
  }
}
