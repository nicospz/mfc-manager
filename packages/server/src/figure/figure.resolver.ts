import { PrismaSelect } from '@paljs/plugins';
import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

import { Resolver, Query, Args, Info } from '@nestjs/graphql';
import { Figure } from 'src/@generated/figure/figure.model';
import { FigureWhereInput } from 'src/@generated/figure/figure-where.input';

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

prisma.$on('query', (event) => {
  console.log(event);
});

@Resolver(() => Figure)
export class FigureResolver {
  @Query(() => [Figure])
  async figures(
    @Args('where') where: FigureWhereInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;
    return await prisma.figure.findMany({ where, ...select });
  }
}
