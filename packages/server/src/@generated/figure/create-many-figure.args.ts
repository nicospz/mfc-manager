import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureCreateManyInput } from './figure-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyFigureArgs {

    @Field(() => [FigureCreateManyInput], {nullable:false})
    @Type(() => FigureCreateManyInput)
    data!: Array<FigureCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
