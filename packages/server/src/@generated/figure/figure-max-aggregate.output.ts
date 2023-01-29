import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Status } from '../prisma/status.enum';

@ObjectType()
export class FigureMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Date, {nullable:true})
    releaseDate?: Date | string;

    @Field(() => Date, {nullable:true})
    paymentDate?: Date | string;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => Int, {nullable:true})
    price?: number;

    @Field(() => String, {nullable:true})
    shop?: string;

    @Field(() => Status, {nullable:true})
    status?: keyof typeof Status;
}
