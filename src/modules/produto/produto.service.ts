import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto, Empresa } from '@prisma/client';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  private async getEmpresasDoUsuario(usuarioId: number): Promise<number> {
    const vinculo = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        usuarioId,
      },
    });

    if (!vinculo) {
      throw new ForbiddenException(
        'Usuário não está vinculado a nenhuma empresa',
      );
    }

    return vinculo.empresaId;
  }

  async buscarFornecedoresPorProduto(nomeProduto: string, usuarioId: number) {
    await this.getEmpresasDoUsuario(usuarioId);

    const produtos = (await this.prisma.produto.findMany({
      where: {
        nome: {
          contains: nomeProduto,
        },
      },
      include: {
        fornecedor: true,
      },
    })) as (Produto & { fornecedor: Empresa })[];

    return produtos.map((produto) => ({
      fornecedorId: produto.fornecedor.id,
      fornecedorNome: produto.fornecedor.razaoSocial,
      precoUnitario: produto.precoUnitario,
      produtoId: produto.id,
    }));
  }

  async create(data: CreateProdutoDto, usuarioId: number) {
    const fornecedorId = await this.getEmpresasDoUsuario(usuarioId);

    const produtoExistente = await this.prisma.produto.findFirst({
      where: {
        nome: data.nome,
        fornecedorId,
      },
    });

    if (produtoExistente) {
      throw new BadRequestException(
        'Já existe um produto com esse nome para este fornecedor',
      );
    }

    return this.prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        precoUnitario: data.precoUnitario,
        fornecedorId,
      },
    });
  }

  async findAll(usuarioId: number) {
    const fornecedorId = await this.getEmpresasDoUsuario(usuarioId);

    return this.prisma.produto.findMany({
      where: {
        fornecedorId,
      },
    });
  }

  async findOne(id: number, usuarioId: number) {
    const fornecedorId = await this.getEmpresasDoUsuario(usuarioId);

    const produto = await this.prisma.produto.findFirst({
      where: {
        id,
        fornecedorId,
      },
    });

    if (!produto) {
      throw new NotFoundException(
        'Produto não encontrado ou você não tem acesso a ele',
      );
    }

    return produto;
  }

  async update(id: number, data: UpdateProdutoDto, usuarioId: number) {
    const fornecedorId = await this.getEmpresasDoUsuario(usuarioId);

    const produto = await this.prisma.produto.findFirst({
      where: {
        id,
        fornecedorId,
      },
    });

    if (!produto) {
      throw new NotFoundException(
        'Produto não encontrado ou você não tem acesso a ele',
      );
    }

    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, usuarioId: number) {
    const fornecedorId = await this.getEmpresasDoUsuario(usuarioId);

    const produto = await this.prisma.produto.findFirst({
      where: {
        id,
        fornecedorId,
      },
    });

    if (!produto) {
      throw new NotFoundException(
        'Produto não encontrado ou você não tem acesso a ele',
      );
    }

    return this.prisma.produto.delete({ where: { id } });
  }
}
