import { IsString, IsInt, Min, MaxLength } from 'class-validator';

export class FilmeSchema {
  @IsString()
  @MaxLength(120)
  titulo: string;

  @IsInt()
  @Min(1)
  classificacaoIndicativa: number;

  @IsString()
  lancamento: string;
}
