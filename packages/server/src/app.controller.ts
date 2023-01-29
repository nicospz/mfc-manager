import {
  Controller,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { scrapeCollection } from 'src/scraper/index';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('api/scraper')
  async scrapeFigures(@Headers() headers): Promise<any> {
    if (headers.authorization !== process.env.SCRAPER_SECRET_KEY) {
      throw new UnauthorizedException();
    }
    console.time('Scraped and saved figures in');
    const figures = await scrapeCollection();
    console.log('Deleting all figures...');
    await this.prismaService.figure.deleteMany();
    console.log('Creating figures...');
    return this.prismaService.figure
      .createMany({
        data: figures.map((figure) => ({
          ...figure,
          status: figure.status as Status,
        })),
      })
      .then(() => console.timeEnd('Scraped and saved figures in'));
  }
}
