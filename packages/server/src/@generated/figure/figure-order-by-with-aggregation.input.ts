import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { FigureCountOrderByAggregateInput } from './figure-count-order-by-aggregate.input';
import { FigureAvgOrderByAggregateInput } from './figure-avg-order-by-aggregate.input';
import { FigureMaxOrderByAggregateInput } from './figure-max-order-by-aggregate.input';
import { FigureMinOrderByAggregateInput } from './figure-min-order-by-aggregate.input';
import { FigureSumOrderByAggregateInput } from './figure-sum-order-by-aggregate.input';

@InputType()
export class FigureOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    releaseDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    paymentDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    shop?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => FigureCountOrderByAggregateInput, {nullable:true})
    _count?: FigureCountOrderByAggregateInput;

    @Field(() => FigureAvgOrderByAggregateInput, {nullable:true})
    _avg?: FigureAvgOrderByAggregateInput;

    @Field(() => FigureMaxOrderByAggregateInput, {nullable:true})
    _max?: FigureMaxOrderByAggregateInput;

    @Field(() => FigureMinOrderByAggregateInput, {nullable:true})
    _min?: FigureMinOrderByAggregateInput;

    @Field(() => FigureSumOrderByAggregateInput, {nullable:true})
    _sum?: FigureSumOrderByAggregateInput;
}
