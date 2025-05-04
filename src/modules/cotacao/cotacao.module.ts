import { Module } from '@nestjs/common';
import { CotacaoService } from './cotacao.service';
import { CotacaoController } from './cotacao.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CotacaoController],
  providers: [CotacaoService, PrismaService],
  exports: [CotacaoService],
})
export class CotacaoModule {}
