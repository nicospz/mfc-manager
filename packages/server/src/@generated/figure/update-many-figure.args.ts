import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FigureUpdateManyMutationInput } from './figure-update-many-mutation.input';
import { Type } from 'class-transformer';
import { FigureWhereInput } from './figure-where.input';

@ArgsType()
export class UpdateManyFigureArgs {

    @Field(() => FigureUpdateManyMutationInput, {nullable:false})
    @Type(() => FigureUpdateManyMutationInput)
    data!: FigureUpdateManyMutationInput;

    @Field(() => FigureWhereInput, {nullable:true})
    @Type(() => FigureWhereInput)
    where?: FigureWhereInput;
}
