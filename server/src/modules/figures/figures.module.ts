import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookiesModule } from '@server/src/modules/cookies/cookies.module';
import { Figure } from '@server/src/entities/figure.entity';
import { FiguresResolver } from '@server/src/modules/figures/figures.resolver';
import { FiguresService } from '@server/src/modules/figures/figures.service';

@Module({
    imports: [TypeOrmModule.forFeature([Figure]), CookiesModule],
    providers: [FiguresService, FiguresResolver],
    exports: [FiguresService],
})
export class FiguresModule {}
