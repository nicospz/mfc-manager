import { type FindManyOptions, type Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type CreateFigureInput } from '@server/src/modules/figures/dto/createFigureInput';
import { Figure } from '@server/src/entities/figure.entity';
import { UpdateFigureInput } from '@server/src/modules/figures/dto/updateFigureInput';

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

  async update(
    id: number,
    updateFigureInput: UpdateFigureInput,
  ): Promise<Figure | null> {
    const figure = await this.figuresRepository.findOne({
      where: { id },
    });
    if (figure) {
      return await this.figuresRepository.save({
        ...figure,
        ...updateFigureInput,
      });
    }
    return null;
  }

  async createOrUpdate(createFigureInput: CreateFigureInput): Promise<Figure> {
    const figure = await this.figuresRepository.findOne({
      where: { id: createFigureInput.id },
    });
    if (figure) {
      return await this.figuresRepository.save({
        ...figure,
        ...createFigureInput,
      });
    }
    return await this.create(createFigureInput);
  }

  async findAll(findManyOptions?: FindManyOptions<Figure>): Promise<Figure[]> {
    return await this.figuresRepository.find(findManyOptions);
  }
}
