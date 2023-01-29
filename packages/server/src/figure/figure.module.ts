import { Module } from '@nestjs/common';

import { FigureResolver } from 'src/figure/figure.resolver';

@Module({
  imports: [],
  providers: [FigureResolver],
})
export class FigureModule {}
