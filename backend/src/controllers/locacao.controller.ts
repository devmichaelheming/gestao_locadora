import { LocacaoSchema } from '../schemas/locacao.schema';
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
import { LocacaoModel } from 'src/models/locacao.model';

@Controller('/locacao')
export class LocacaoController {
  constructor(
    @InjectRepository(LocacaoModel) private model: Repository<LocacaoModel>,
  ) {}

  @Get()
  public getAll(): Promise<LocacaoModel[]> {
    return this.model.find({ relations: ['cliente', 'filme'] });
  }

  @Post()
  public create(@Body() body: LocacaoSchema): Promise<LocacaoModel> {
    return this.model.save(body);
  }

  @Get(':id')
  public async getId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LocacaoModel> {
    const locacao = await this.model.findOne({ where: { id } });

    if (!locacao) {
      throw new NotFoundException('Locação inexistente.');
    }
    return locacao;
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: LocacaoSchema,
  ): Promise<LocacaoModel> {
    const locacao = await this.model.findOne({ where: { id } });

    if (!locacao) {
      throw new NotFoundException('Locação inexistente.');
    }

    await this.model.update({ id }, body);

    return this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const locacao = await this.model.findOne({ where: { id } });

    if (!locacao) {
      throw new NotFoundException('Locação inexistente.');
    }

    await this.model.delete({ id });

    return 'Locação removido com sucesso';
  }
}
