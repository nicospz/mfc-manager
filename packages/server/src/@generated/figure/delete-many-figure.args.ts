import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureWhereInput } from './figure-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyFigureArgs {

    @Field(() => FigureWhereInput, {nullable:true})
    @Type(() => FigureWhereInput)
    where?: FigureWhereInput;
}
