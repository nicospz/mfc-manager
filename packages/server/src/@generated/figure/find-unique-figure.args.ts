import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureWhereUniqueInput } from './figure-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueFigureArgs {

    @Field(() => FigureWhereUniqueInput, {nullable:false})
    @Type(() => FigureWhereUniqueInput)
    where!: FigureWhereUniqueInput;
}
