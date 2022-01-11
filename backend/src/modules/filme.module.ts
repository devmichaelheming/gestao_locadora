import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeModel } from 'src/models/filme.model';
import { FilmeController } from '../controllers/Filme.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmeModel])],
  controllers: [FilmeController],
})
export class FilmeModule {}
