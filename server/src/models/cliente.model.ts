import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClienteModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nome: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 10 })
  data_nascimento: string;
}
