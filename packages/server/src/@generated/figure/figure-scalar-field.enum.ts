import { registerEnumType } from '@nestjs/graphql';

export enum FigureScalarFieldEnum {
    id = "id",
    releaseDate = "releaseDate",
    paymentDate = "paymentDate",
    title = "title",
    price = "price",
    shop = "shop",
    status = "status"
}


registerEnumType(FigureScalarFieldEnum, { name: 'FigureScalarFieldEnum', description: undefined })
