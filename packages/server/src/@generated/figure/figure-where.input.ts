import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumStatusFilter } from '../prisma/enum-status-filter.input';

@InputType()
export class FigureWhereInput {

    @Field(() => [FigureWhereInput], {nullable:true})
    AND?: Array<FigureWhereInput>;

    @Field(() => [FigureWhereInput], {nullable:true})
    OR?: Array<FigureWhereInput>;

    @Field(() => [FigureWhereInput], {nullable:true})
    NOT?: Array<FigureWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    releaseDate?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    paymentDate?: DateTimeNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    price?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    shop?: StringFilter;

    @Field(() => EnumStatusFilter, {nullable:true})
    status?: EnumStatusFilter;
}
