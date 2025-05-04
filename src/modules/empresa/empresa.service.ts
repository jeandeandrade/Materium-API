import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    return this.prisma.empresa.create({
      data: createEmpresaDto,
    });
  }

  async findAll() {
    return this.prisma.empresa.findMany({
      include: {
        usuarios: true,
      },
    });
  }

  async findOne(id: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: +id },
      include: {
        usuarios: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }

    return empresa;
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    try {
      return await this.prisma.empresa.update({
        where: { id: +id },
        data: updateEmpresaDto,
      });
    } catch {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.empresa.delete({
        where: { id: +id },
      });
    } catch {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }
  }
}
