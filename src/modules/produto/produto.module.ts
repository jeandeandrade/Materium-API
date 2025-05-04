import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, PrismaService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
