import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateUsuarioDto) {
    return this.prisma.usuario.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
