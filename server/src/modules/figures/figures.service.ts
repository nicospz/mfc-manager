import { type FindManyOptions, type Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type CreateFigureInput } from '@server/src/modules/figures/dto/createFigureInput';
import { Figure } from '@server/src/entities/figure.entity';

@Injectable()
export class FiguresService {
  constructor(
    @InjectRepository(Figure)
    private readonly figuresRepository: Repository<Figure>,
  ) {}

  async create(createFigureInput: CreateFigureInput): Promise<Figure> {
    const figure = this.figuresRepository.create(createFigureInput);
    return await this.figuresRepository.save(figure);
  }

  async findAll(findManyOptions?: FindManyOptions<Figure>): Promise<Figure[]> {
    return await this.figuresRepository.find(findManyOptions);
  }

  async clear(): Promise<void> {
    await this.figuresRepository.clear();
  }
}
