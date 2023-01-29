import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Status } from '../prisma/status.enum';

@ObjectType()
export class Figure {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Date, {nullable:true})
    releaseDate!: Date | null;

    @Field(() => Date, {nullable:true})
    paymentDate!: Date | null;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => String, {nullable:false})
    shop!: string;

    @Field(() => Status, {nullable:false})
    status!: keyof typeof Status;
}
