import { Column, Entity, PrimaryColumn } from 'typeorm';
import { InputType, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class Cookie {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    domain: string;

    @Column()
    path: string;

    @Column()
    expiresAt: Date;

    @Column()
    updatedAt: Date;
}
