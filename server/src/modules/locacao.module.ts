import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocacaoModel } from 'src/models/locacao.model';
import { LocacaoController } from '../controllers/Locacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocacaoModel])],
  controllers: [LocacaoController],
})
export class LocacaoModule {}
