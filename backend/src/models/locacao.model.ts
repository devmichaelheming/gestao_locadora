import { FilmeModel } from './filme.model';
import { ClienteModel } from './cliente.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class LocacaoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ClienteModel)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  cliente: ClienteModel;

  @OneToOne(() => FilmeModel)
  @JoinColumn({ name: 'filme_id', referencedColumnName: 'id' })
  filme: FilmeModel;

  @Column({ length: 10 })
  data_locacao: string;

  @Column({ length: 10 })
  data_devolucao: string;
}
