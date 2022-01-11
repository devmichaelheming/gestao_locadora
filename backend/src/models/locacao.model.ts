import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocacaoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_cliente: number;

  @Column('int')
  id_filme: number;

  @Column({ length: 10 })
  data_locacao: string;

  @Column({ length: 10 })
  data_devolucao: string;
}
