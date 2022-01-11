import { IsString, MaxLength } from 'class-validator';

export class FilmeSchema {
  @IsString()
  @MaxLength(120)
  titulo: string;

  @IsString()
  @MaxLength(120)
  classificacaoIndicativa: string;

  @IsString()
  lancamento: string;
}
