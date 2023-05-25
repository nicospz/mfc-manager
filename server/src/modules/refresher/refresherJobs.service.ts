import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { type RefresherService } from '@server/src/modules/refresher/refresher.service';

const REFRESH_INTERVAL_MINUTES = process.env.REFRESH_INTERVAL_MINUTES ?? 10;
const REFRESH_IMAGES_INTERVAL_MINUTES =
    process.env.REFRESH_IMAGES_INTERVAL_MINUTES ?? 10;
@Injectable()
export class RefresherJobsService {
    constructor(private readonly refresherService: RefresherService) {}

    private readonly logger = new Logger(RefresherJobsService.name);

    @Cron(`*/${REFRESH_INTERVAL_MINUTES} * * * *`)
    async refreshFigures() {
        await this.refresherService.refreshFigures();
        this.logger.debug('Refreshed figures');
    }

    @Cron(`*/${REFRESH_IMAGES_INTERVAL_MINUTES} * * * *`)
    async refreshImages() {
        await this.refresherService.refreshImages();
        this.logger.debug('Refreshed images');
    }
}
