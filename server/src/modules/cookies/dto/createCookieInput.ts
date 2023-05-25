import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCookieInput {
    name: string;

    value: string;

    domain: string;

    path: string;

    expiresAt: Date;

    updatedAt: Date;
}
