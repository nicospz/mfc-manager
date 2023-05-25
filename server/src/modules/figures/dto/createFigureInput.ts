import { PrimaryGeneratedColumn } from 'typeorm';
import { InputType, Field } from '@nestjs/graphql';
import { type Status } from '@server/src/entities/figure.entity';

@InputType()
export class CreateFigureInput {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    title: string;

    @Field()
    price: number;

    @Field()
    shop: string;

    @Field()
    status: Status;

    @Field({ nullable: true })
    releaseDate?: Date;

    @Field({ nullable: true })
    paymentDate?: Date;

    @Field({ nullable: true })
    score?: number;

    @Field({ nullable: true })
    wishability?: number;
}
