import { registerEnumType } from '@nestjs/graphql';

export enum Status {
    Ordered = "Ordered",
    Owned = "Owned",
    Wished = "Wished"
}


registerEnumType(Status, { name: 'Status', description: undefined })
