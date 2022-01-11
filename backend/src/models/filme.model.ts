import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilmeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  titulo: string;

  @Column('int')
  classificacaoIndicativa: number;

  @Column({ length: 10 })
  lancamento: string;
}
