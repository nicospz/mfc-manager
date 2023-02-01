import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

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
  @Field()
  @PrimaryGeneratedColumn()
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
  @Column({
    type: 'simple-enum',
    enum: Status,
  })
  status: Status;

  @Field({ nullable: true })
  @Column({ nullable: true })
  releaseDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  paymentDate: Date;
}
