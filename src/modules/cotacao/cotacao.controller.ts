import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CotacaoService } from './cotacao.service';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';
import { UpdateCotacaoDto } from './dto/update-cotacao.dto';
import { CreateCotacaoItemDto } from './dto/create-cotacao-item.dto';

@Controller('cotas')
export class CotacaoController {
  constructor(private readonly cotacaoService: CotacaoService) {}

  @Post()
  create(@Body() createCotacaoDto: CreateCotacaoDto) {
    return this.cotacaoService.create(createCotacaoDto);
  }

  @Post(':cotacaoId/itens')
  addItem(
    @Param('cotacaoId') cotacaoId: string,
    @Body() createCotacaoItemDto: CreateCotacaoItemDto,
  ) {
    return this.cotacaoService.addItem(cotacaoId, createCotacaoItemDto);
  }

  @Get()
  findAll() {
    return this.cotacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotacaoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCotacaoDto: UpdateCotacaoDto) {
    return this.cotacaoService.update(id, updateCotacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotacaoService.remove(id);
  }
}
