import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './modules/cliente.module';
import { FilmeModule } from './modules/filme.module';
import { LocacaoModule } from './modules/locacao.module';

@Module({
  imports: [ClienteModule, FilmeModule, LocacaoModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
