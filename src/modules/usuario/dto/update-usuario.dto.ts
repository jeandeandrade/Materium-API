import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}

// import { IsEmail, IsOptional, MinLength, IsNotEmpty } from 'class-validator';

// export class UpdateUsuarioDto {
//   @IsOptional()
//   @IsEmail()
//   email?: string;

//   @IsOptional()
//   @IsNotEmpty()
//   nome?: string;

//   @IsOptional()
//   @MinLength(6)
//   senha?: string;

//   @IsOptional()
//   @IsNotEmpty()
//   papel?: string;
// }
