import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  nome: string;

  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  papel: string;
}
