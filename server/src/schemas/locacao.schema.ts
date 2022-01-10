import { IsNumber, IsString } from 'class-validator';

export class LocacaoSchema {
  @IsNumber()
  id_cliente: number;

  @IsNumber()
  id_filme: number;

  @IsString()
  data_locacao: string;

  @IsString()
  data_devolucao: string;
}
