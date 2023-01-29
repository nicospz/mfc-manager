import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { EnumStatusWithAggregatesFilter } from '../prisma/enum-status-with-aggregates-filter.input';

@InputType()
export class FigureScalarWhereWithAggregatesInput {

    @Field(() => [FigureScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<FigureScalarWhereWithAggregatesInput>;

    @Field(() => [FigureScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<FigureScalarWhereWithAggregatesInput>;

    @Field(() => [FigureScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<FigureScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    releaseDate?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    paymentDate?: DateTimeNullableWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    title?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    price?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    shop?: StringWithAggregatesFilter;

    @Field(() => EnumStatusWithAggregatesFilter, {nullable:true})
    status?: EnumStatusWithAggregatesFilter;
}
