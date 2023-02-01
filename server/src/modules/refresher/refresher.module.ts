import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cookie } from '@server/src/entities/cookie.entity';
import { Figure } from '@server/src/entities/figure.entity';
import { CookiesModule } from '@server/src/modules/cookies/cookies.module';
import { CookiesService } from '@server/src/modules/cookies/cookies.service';
import { FiguresModule } from '@server/src/modules/figures/figures.module';
import { FiguresService } from '@server/src/modules/figures/figures.service';
import { RefresherController } from '@server/src/modules/refresher/refresher.controller';
import { RefresherService } from '@server/src/modules/refresher/refresher.service';
import { RefresherJobsService } from '@server/src/modules/refresher/refresherJobs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Figure]),
    FiguresModule,
    TypeOrmModule.forFeature([Cookie]),
    CookiesModule,
  ],
  controllers: [RefresherController],
  providers: [
    RefresherService,
    FiguresService,
    CookiesService,
    RefresherJobsService,
  ],
})
export class RefresherModule {}
