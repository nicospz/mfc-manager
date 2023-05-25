import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FiguresModule } from '@server/src/modules/figures/figures.module';
import { dataSourceConfig } from '@server/src/data-source';
import { AppService } from '@server/src/app.service';
import { CookiesModule } from '@server/src/modules/cookies/cookies.module';
import { RefresherModule } from '@server/src/modules/refresher/refresher.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: process.env.NODE_ENV !== 'production',
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        TypeOrmModule.forRoot({ ...dataSourceConfig, autoLoadEntities: true }),
        ScheduleModule.forRoot(),
        FiguresModule,
        CookiesModule,
        RefresherModule,
    ],
    providers: [AppService],
})
export class AppModule {}
