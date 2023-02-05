import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RefresherService } from '@server/src/modules/refresher/refresher.service';

const REFRESH_INTERVAL_MINUTES = process.env.REFRESH_INTERVAL_MINUTES ?? 10;
@Injectable()
export class RefresherJobsService {
  constructor(private readonly refresherService: RefresherService) {}

  private readonly logger = new Logger(RefresherJobsService.name);

  @Cron(`*/${REFRESH_INTERVAL_MINUTES} * * * *`)
  async refreshFigures() {
    await this.refresherService.refreshFigures();
    this.logger.debug('Refreshed figures');
  }
}
