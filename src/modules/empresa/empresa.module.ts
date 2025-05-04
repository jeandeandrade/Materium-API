import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [EmpresaController],
  providers: [EmpresaService, PrismaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
