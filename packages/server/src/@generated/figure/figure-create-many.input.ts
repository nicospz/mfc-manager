import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Status } from '../prisma/status.enum';

@InputType()
export class FigureCreateManyInput {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Date, {nullable:true})
    releaseDate?: Date | string;

    @Field(() => Date, {nullable:true})
    paymentDate?: Date | string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => String, {nullable:false})
    shop!: string;

    @Field(() => Status, {nullable:false})
    status!: keyof typeof Status;
}
