import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateFigureInput {
    @Field()
    imageUrl?: string | null;

    @Field()
    score?: number;
}
