import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';
import { UpdateCotacaoDto } from './dto/update-cotacao.dto';
import { CreateCotacaoItemDto } from './dto/create-cotacao-item.dto';
import { Cotacao, CotacaoItem } from '@prisma/client';

@Injectable()
export class CotacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCotacaoDto: CreateCotacaoDto): Promise<Cotacao> {
    return this.prisma.cotacao.create({
      data: createCotacaoDto,
    });
  }

  async addItem(
    cotacaoId: string,
    createCotacaoItemDto: CreateCotacaoItemDto,
  ): Promise<CotacaoItem> {
    const cotacao = await this.prisma.cotacao.findUnique({
      where: { id: Number(cotacaoId) },
    });

    if (!cotacao) {
      throw new NotFoundException(`Cotação com ID ${cotacaoId} não encontrada`);
    }

    return this.prisma.cotacaoItem.create({
      data: {
        ...createCotacaoItemDto,
        cotacaoId: cotacao.id, // Associa corretamente
      },
    });
  }

  async findAll(): Promise<Cotacao[]> {
    return this.prisma.cotacao.findMany({
      include: { itens: true },
    });
  }

  async findOne(id: string): Promise<Cotacao> {
    const cotacao = await this.prisma.cotacao.findUnique({
      where: { id: Number(id) },
      include: { itens: true },
    });

    if (!cotacao) {
      throw new NotFoundException(`Cotação com ID ${id} não encontrada`);
    }

    return cotacao;
  }

  async update(
    id: string,
    updateCotacaoDto: UpdateCotacaoDto,
  ): Promise<Cotacao> {
    const existing = await this.prisma.cotacao.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      throw new NotFoundException(`Cotação com ID ${id} não encontrada`);
    }

    return this.prisma.cotacao.update({
      where: { id: Number(id) },
      data: updateCotacaoDto,
    });
  }

  async remove(id: string): Promise<void> {
    const existing = await this.prisma.cotacao.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      throw new NotFoundException(`Cotação com ID ${id} não encontrada`);
    }

    await this.prisma.cotacao.delete({
      where: { id: Number(id) },
    });
  }
}
