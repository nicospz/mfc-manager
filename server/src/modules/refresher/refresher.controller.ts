import { Controller, Get } from '@nestjs/common';
import { RefresherService } from '@server/src/modules/refresher/refresher.service';

@Controller('refresh')
export class RefresherController {
  constructor(private readonly refresherService: RefresherService) {}

  @Get('/cookies')
  async refreshCookies() {
    return await this.refresherService.refreshCookies();
  }

  @Get('/figures')
  async refreshFigures() {
    return await this.refresherService.refreshFigures();
  }

  @Get('/images')
  async refreshImages() {
    return await this.refresherService.refreshImages();
  }

  @Get('/allimages')
  async refreshAllImages() {
    return await this.refresherService.refreshAllImages();
  }
}
