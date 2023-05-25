import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookiesService } from '@server/src/modules/cookies/cookies.service';
import { Cookie } from '@server/src/entities/cookie.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cookie])],
    providers: [CookiesService],
})
export class CookiesModule {}
