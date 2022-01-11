import { IsString, MaxLength } from 'class-validator';

export class ClienteSchema {
  @IsString()
  @MaxLength(120)
  nome: string;

  @IsString()
  cpf: string;

  @IsString()
  data_nascimento: string;
}
