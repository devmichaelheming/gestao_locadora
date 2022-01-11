import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModel } from 'src/models/cliente.model';
import { ClienteController } from 'src/controllers/cliente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteModel])],
  controllers: [ClienteController],
})
export class ClienteModule {}
