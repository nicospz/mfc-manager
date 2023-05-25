import { type Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cookie } from '@server/src/entities/cookie.entity';
import { type CreateCookieInput } from '@server/src/modules/cookies/dto/createCookieInput';

@Injectable()
export class CookiesService {
    constructor(
        @InjectRepository(Cookie)
        private readonly cookiesRepository: Repository<Cookie>
    ) {}

    async findAll() {
        return await this.cookiesRepository.find();
    }

    async create(createCookieInput: CreateCookieInput): Promise<Cookie> {
        const cookie = this.cookiesRepository.create(createCookieInput);
        return await this.cookiesRepository.save(cookie);
    }

    async update(
        id: number,
        updateCookieInput: CreateCookieInput
    ): Promise<Cookie> {
        const cookie = await this.cookiesRepository.findOne({ where: { id } });
        if (cookie == null) {
            throw new Error('Cookie not found');
        }
        const updatedCookie = Object.assign(cookie, updateCookieInput);
        return await this.cookiesRepository.save(updatedCookie);
    }

    async clear(): Promise<void> {
        await this.cookiesRepository.clear();
    }
}
