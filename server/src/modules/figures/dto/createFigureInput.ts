import { InputType, Field } from '@nestjs/graphql';
import { Status } from '@server/src/entities/figure.entity';

@InputType()
export class CreateFigureInput {
  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  shop: string;

  @Field()
  status: Status;

  @Field({ nullable: true })
  releaseDate?: Date;

  @Field({ nullable: true })
  paymentDate?: Date;
}
