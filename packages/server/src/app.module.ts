import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { PrismaService } from 'src/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FigureModule } from 'src/figure/figure.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    FigureModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/out'),
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
