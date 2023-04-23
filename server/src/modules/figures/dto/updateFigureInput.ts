import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateFigureInput {
  @Field()
  imageUrl?: string;

  @Field()
  score?: number;
}
