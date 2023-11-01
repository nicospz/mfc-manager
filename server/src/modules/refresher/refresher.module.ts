import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Figure } from '@server/src/entities/figure.entity';
import { Cookie } from '@server/src/entities/cookie.entity';
import { FiguresModule } from '@server/src/modules/figures/figures.module';
import { CookiesModule } from '@server/src/modules/cookies/cookies.module';
import { RefresherController } from '@server/src/modules/refresher/refresher.controller';
import { RefresherService } from '@server/src/modules/refresher/refresher.service';
import { RefresherJobsService } from '@server/src/modules/refresher/refresherJobs.service';
import { FiguresService } from '@server/src/modules/figures/figures.service';
import { CookiesService } from '@server/src/modules/cookies/cookies.service';

@Module({
    imports: [
        FiguresModule,
        CookiesModule,
        TypeOrmModule.forFeature([Figure, Cookie]),
    ],
    controllers: [RefresherController],
    providers: [
        FiguresService,
        CookiesService,
        RefresherService,
        RefresherJobsService,
    ],
})
export class RefresherModule {}
