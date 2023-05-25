import { Entity } from 'typeorm';
import { InputType, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class Cookie {
    id: number;

    name: string;

    value: string;

    domain: string;

    path: string;

    expiresAt: Date;

    updatedAt: Date;
}
