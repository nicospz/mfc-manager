import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureWhereInput } from './figure-where.input';
import { Type } from 'class-transformer';
import { FigureOrderByWithRelationInput } from './figure-order-by-with-relation.input';
import { FigureWhereUniqueInput } from './figure-where-unique.input';
import { Int } from '@nestjs/graphql';
import { FigureCountAggregateInput } from './figure-count-aggregate.input';
import { FigureAvgAggregateInput } from './figure-avg-aggregate.input';
import { FigureSumAggregateInput } from './figure-sum-aggregate.input';
import { FigureMinAggregateInput } from './figure-min-aggregate.input';
import { FigureMaxAggregateInput } from './figure-max-aggregate.input';

@ArgsType()
export class FigureAggregateArgs {

    @Field(() => FigureWhereInput, {nullable:true})
    @Type(() => FigureWhereInput)
    where?: FigureWhereInput;

    @Field(() => [FigureOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<FigureOrderByWithRelationInput>;

    @Field(() => FigureWhereUniqueInput, {nullable:true})
    cursor?: FigureWhereUniqueInput;

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
