import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RefresherService } from '@server/src/modules/refresher/refresher.service';

@Injectable()
export class RefresherJobsService {
  constructor(private readonly refresherService: RefresherService) {}

  private readonly logger = new Logger(RefresherJobsService.name);

  @Cron('*/5 * * * *')
  async refreshFigures() {
    await this.refresherService.refreshFigures();
    this.logger.debug('Refreshed figures');
  }
}
