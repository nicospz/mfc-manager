import { Resolver, Query, Args } from '@nestjs/graphql';
import { Figure, Status } from '@server/src/entities/figure.entity';
import { FiguresService } from '@server/src/modules/figures/figures.service';

@Resolver(() => Figure)
export class FiguresResolver {
    constructor(private readonly figuresService: FiguresService) {}

    @Query(() => [Figure], { name: 'figures' })
    async figures(@Args('status', { type: () => Status }) status: Status) {
        return await this.figuresService.findAll({
            where: {
                status,
            },
        });
    }
}
