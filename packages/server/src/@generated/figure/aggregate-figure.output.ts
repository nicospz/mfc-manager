import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { FigureCountAggregate } from './figure-count-aggregate.output';
import { FigureAvgAggregate } from './figure-avg-aggregate.output';
import { FigureSumAggregate } from './figure-sum-aggregate.output';
import { FigureMinAggregate } from './figure-min-aggregate.output';
import { FigureMaxAggregate } from './figure-max-aggregate.output';

@ObjectType()
export class AggregateFigure {

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
