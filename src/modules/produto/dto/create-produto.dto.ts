import { IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precoUnitario: number;

  @IsInt()
  @IsPositive()
  fornecedorId: number;
}
