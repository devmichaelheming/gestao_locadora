import { ClienteSchema } from './../schemas/cliente.schema';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClienteModel } from 'src/models/cliente.model';

@Controller('/cliente')
export class ClienteController {
  constructor(
    @InjectRepository(ClienteModel) private model: Repository<ClienteModel>,
  ) {}

  @Get()
  public getAll(): Promise<ClienteModel[]> {
    return this.model.find();
  }

  @Post()
  public create(@Body() body: ClienteSchema): Promise<ClienteModel> {
    return this.model.save(body);
  }

  @Get(':id')
  public async getId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClienteModel> {
    const cliente = await this.model.findOne({ where: { id } });

    if (!cliente) {
      throw new NotFoundException('Cliente inexistente.');
    }
    return cliente;
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ClienteSchema,
  ): Promise<ClienteModel> {
    const cliente = await this.model.findOne({ where: { id } });

    if (!cliente) {
      throw new NotFoundException('Cliente inexistente.');
    }

    await this.model.update({ id }, body);

    return this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const cliente = await this.model.findOne({ where: { id } });

    if (!cliente) {
      throw new NotFoundException('Cliente inexistente.');
    }

    await this.model.delete({ id });

    return 'Cliente removido com sucesso';
  }
}
