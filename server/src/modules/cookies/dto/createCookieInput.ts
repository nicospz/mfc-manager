import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCookieInput {
  @Field()
  name: string;

  @Field()
  value: string;

  @Field()
  domain: string;

  @Field()
  path: string;

  @Field()
  expiresAt: Date;

  @Field()
  updatedAt: Date;
}
