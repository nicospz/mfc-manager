import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureWhereUniqueInput } from './figure-where-unique.input';
import { Type } from 'class-transformer';
import { FigureCreateInput } from './figure-create.input';
import { FigureUpdateInput } from './figure-update.input';

@ArgsType()
export class UpsertOneFigureArgs {

    @Field(() => FigureWhereUniqueInput, {nullable:false})
    @Type(() => FigureWhereUniqueInput)
    where!: FigureWhereUniqueInput;

    @Field(() => FigureCreateInput, {nullable:false})
    @Type(() => FigureCreateInput)
    create!: FigureCreateInput;

    @Field(() => FigureUpdateInput, {nullable:false})
    @Type(() => FigureUpdateInput)
    update!: FigureUpdateInput;
}
