import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureCreateInput } from './figure-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneFigureArgs {

    @Field(() => FigureCreateInput, {nullable:false})
    @Type(() => FigureCreateInput)
    data!: FigureCreateInput;
}
