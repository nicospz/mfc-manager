import { Entity } from 'typeorm';
import { InputType, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Status {
    ORDERED = 'Ordered',
    OWNED = 'Owned',
    WISHED = 'Wished',
}
registerEnumType(Status, {
    name: 'Status',
    description: 'Status of the figure.',
});

@Entity()
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class Figure {
    id: number;

    title: string;

    price: number;

    shop: string;

    status: Status;

    imageUrl: string | null;

    releaseDate: Date;

    paymentDate: Date;

    score: number;

    wishability: number;
}
