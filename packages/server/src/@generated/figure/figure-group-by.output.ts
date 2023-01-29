import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Status } from '../prisma/status.enum';
import { FigureCountAggregate } from './figure-count-aggregate.output';
import { FigureAvgAggregate } from './figure-avg-aggregate.output';
import { FigureSumAggregate } from './figure-sum-aggregate.output';
import { FigureMinAggregate } from './figure-min-aggregate.output';
import { FigureMaxAggregate } from './figure-max-aggregate.output';

@ObjectType()
export class FigureGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Date, {nullable:true})
    releaseDate?: Date | string;

    @Field(() => Date, {nullable:true})
    paymentDate?: Date | string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => String, {nullable:false})
    shop!: string;

    @Field(() => Status, {nullable:false})
    status!: keyof typeof Status;

    @Field(() => FigureCountAggregate, {nullable:true})
    _count?: FigureCountAggregate;

    @Field(() => FigureAvgAggregate, {nullable:true})
    _avg?: FigureAvgAggregate;

    @Field(() => FigureSumAggregate, {nullable:true})
    _sum?: FigureSumAggregate;

    @Field(() => FigureMinAggregate, {nullable:true})
    _min?: FigureMinAggregate;

    @Field(() => FigureMaxAggregate, {nullable:true})
    _max?: FigureMaxAggregate;
}
