import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/types/request-with-user';

@Controller('produto')
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('buscar-fornecedores/:nomeProduto')
  async buscarFornecedoresPorProduto(
    @Param('nomeProduto') nomeProduto: string,
    @Req() req: RequestWithUser,
  ) {
    return this.produtoService.buscarFornecedoresPorProduto(
      nomeProduto,
      req.user.userId,
    );
  }

  @Post()
  async create(@Body() dto: CreateProdutoDto, @Req() req: RequestWithUser) {
    return this.produtoService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.produtoService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.produtoService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProdutoDto,
    @Req() req: RequestWithUser,
  ) {
    return this.produtoService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.produtoService.remove(id, req.user.userId);
  }
}
