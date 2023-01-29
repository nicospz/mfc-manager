import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureWhereInput } from './figure-where.input';
import { Type } from 'class-transformer';
import { FigureOrderByWithAggregationInput } from './figure-order-by-with-aggregation.input';
import { FigureScalarFieldEnum } from './figure-scalar-field.enum';
import { FigureScalarWhereWithAggregatesInput } from './figure-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { FigureCountAggregateInput } from './figure-count-aggregate.input';
import { FigureAvgAggregateInput } from './figure-avg-aggregate.input';
import { FigureSumAggregateInput } from './figure-sum-aggregate.input';
import { FigureMinAggregateInput } from './figure-min-aggregate.input';
import { FigureMaxAggregateInput } from './figure-max-aggregate.input';

@ArgsType()
export class FigureGroupByArgs {

    @Field(() => FigureWhereInput, {nullable:true})
    @Type(() => FigureWhereInput)
    where?: FigureWhereInput;

    @Field(() => [FigureOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<FigureOrderByWithAggregationInput>;

    @Field(() => [FigureScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof FigureScalarFieldEnum>;

    @Field(() => FigureScalarWhereWithAggregatesInput, {nullable:true})
    having?: FigureScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => FigureCountAggregateInput, {nullable:true})
    _count?: FigureCountAggregateInput;

    @Field(() => FigureAvgAggregateInput, {nullable:true})
    _avg?: FigureAvgAggregateInput;

    @Field(() => FigureSumAggregateInput, {nullable:true})
    _sum?: FigureSumAggregateInput;

    @Field(() => FigureMinAggregateInput, {nullable:true})
    _min?: FigureMinAggregateInput;

    @Field(() => FigureMaxAggregateInput, {nullable:true})
    _max?: FigureMaxAggregateInput;
}
