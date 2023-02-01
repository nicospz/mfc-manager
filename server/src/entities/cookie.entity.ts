import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class Cookie {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  value: string;

  @Field()
  @Column()
  domain: string;

  @Field()
  @Column()
  path: string;

  @Field()
  @Column()
  expiresAt: Date;

  @Field()
  @Column()
  updatedAt: Date;
}
