import { IsString, ValidateNested } from 'class-validator';
import { FilmeModel } from 'src/models/filme.model';
import { ClienteModel } from 'src/models/cliente.model';

export class LocacaoSchema {
  @ValidateNested()
  cliente: ClienteModel;

  @ValidateNested()
  filme: FilmeModel;

  @IsString()
  data_locacao: string;

  @IsString()
  data_devolucao: string;
}
