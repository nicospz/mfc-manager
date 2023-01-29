import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureUpdateInput } from './figure-update.input';
import { Type } from 'class-transformer';
import { FigureWhereUniqueInput } from './figure-where-unique.input';

@ArgsType()
export class UpdateOneFigureArgs {

    @Field(() => FigureUpdateInput, {nullable:false})
    @Type(() => FigureUpdateInput)
    data!: FigureUpdateInput;

    @Field(() => FigureWhereUniqueInput, {nullable:false})
    @Type(() => FigureWhereUniqueInput)
    where!: FigureWhereUniqueInput;
}
