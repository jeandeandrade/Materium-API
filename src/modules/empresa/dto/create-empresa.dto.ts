import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoEmpresa } from '@prisma/client';

export class CreateEmpresaDto {
  @IsString()
  razaoSocial: string;

  @IsString()
  cnpj: string;

  @IsEnum(TipoEmpresa)
  @IsOptional()
  @IsString()
  tipo?: TipoEmpresa;
}
