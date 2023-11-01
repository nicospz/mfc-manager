import { Column, Entity, PrimaryColumn } from 'typeorm';
import {
    Field,
    ID,
    InputType,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql';

export enum Status {
    ORDERED = 'Ordered',
    OWNED = 'Owned',
    WISHED = 'Wished',
    DELETED = 'Deleted',
}
registerEnumType(Status, {
    name: 'Status',
    description: 'Status of the figure.',
});

@Entity()
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class Figure {
    @Field(() => ID)
    @PrimaryColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    shop: string;

    @Field(() => Status)
    @Column()
    status: Status;

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    imageUrl: string | null;

    @Field({ nullable: true })
    @Column({ nullable: true })
    releaseDate: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    paymentDate: Date;

    @Field()
    @Column()
    score: number;

    @Field()
    @Column()
    wishability: number;
}
