import { FilmeSchema } from '../schemas/filme.schema';
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
import { FilmeModel } from 'src/models/filme.model';

@Controller('/filmes')
export class FilmeController {
  constructor(
    @InjectRepository(FilmeModel) private model: Repository<FilmeModel>,
  ) {}

  @Get()
  public getAll(): Promise<FilmeModel[]> {
    return this.model.find();
  }

  @Post()
  public create(@Body() body: FilmeSchema): Promise<FilmeModel> {
    return this.model.save(body);
  }

  @Get(':id')
  public async getId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FilmeModel> {
    const filme = await this.model.findOne({ where: { id } });

    if (!filme) {
      throw new NotFoundException('Filme inexistente.');
    }
    return filme;
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FilmeSchema,
  ): Promise<FilmeModel> {
    const filme = await this.model.findOne({ where: { id } });

    if (!filme) {
      throw new NotFoundException('Filme inexistente.');
    }

    await this.model.update({ id }, body);

    return this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const filme = await this.model.findOne({ where: { id } });

    if (!filme) {
      throw new NotFoundException('Filme inexistente.');
    }

    await this.model.delete({ id });

    return 'Filme removido com sucesso';
  }
}
