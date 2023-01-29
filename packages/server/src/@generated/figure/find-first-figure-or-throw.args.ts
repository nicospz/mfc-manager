import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureWhereInput } from './figure-where.input';
import { Type } from 'class-transformer';
import { FigureOrderByWithRelationInput } from './figure-order-by-with-relation.input';
import { FigureWhereUniqueInput } from './figure-where-unique.input';
import { Int } from '@nestjs/graphql';
import { FigureScalarFieldEnum } from './figure-scalar-field.enum';

@ArgsType()
export class FindFirstFigureOrThrowArgs {

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

    @Field(() => [FigureScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof FigureScalarFieldEnum>;
}
