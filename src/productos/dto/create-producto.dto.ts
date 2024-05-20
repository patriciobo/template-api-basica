import { IsString, MinLength } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MinLength(2)
  modelo: string;
}
