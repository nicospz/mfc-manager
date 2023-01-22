/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectId: any;
};

export type DeleteManyPayload = {
  __typename?: "DeleteManyPayload";
  deletedCount: Scalars["Int"];
};

export type Figure = {
  __typename?: "Figure";
  _id: Scalars["ObjectId"];
  mfcId: Scalars["String"];
  price: Scalars["Int"];
  releaseDate: Scalars["DateTime"];
  shop: Scalars["String"];
  status: Scalars["String"];
  title: Scalars["String"];
};

export type FigureInsertInput = {
  _id?: InputMaybe<Scalars["ObjectId"]>;
  mfcId: Scalars["String"];
  price: Scalars["Int"];
  releaseDate: Scalars["DateTime"];
  shop: Scalars["String"];
  status: Scalars["String"];
  title: Scalars["String"];
};

export type FigureQueryInput = {
  AND?: InputMaybe<Array<FigureQueryInput>>;
  OR?: InputMaybe<Array<FigureQueryInput>>;
  _id?: InputMaybe<Scalars["ObjectId"]>;
  _id_exists?: InputMaybe<Scalars["Boolean"]>;
  _id_gt?: InputMaybe<Scalars["ObjectId"]>;
  _id_gte?: InputMaybe<Scalars["ObjectId"]>;
  _id_in?: InputMaybe<Array<InputMaybe<Scalars["ObjectId"]>>>;
  _id_lt?: InputMaybe<Scalars["ObjectId"]>;
  _id_lte?: InputMaybe<Scalars["ObjectId"]>;
  _id_ne?: InputMaybe<Scalars["ObjectId"]>;
  _id_nin?: InputMaybe<Array<InputMaybe<Scalars["ObjectId"]>>>;
  mfcId?: InputMaybe<Scalars["String"]>;
  mfcId_exists?: InputMaybe<Scalars["Boolean"]>;
  mfcId_gt?: InputMaybe<Scalars["String"]>;
  mfcId_gte?: InputMaybe<Scalars["String"]>;
  mfcId_in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  mfcId_lt?: InputMaybe<Scalars["String"]>;
  mfcId_lte?: InputMaybe<Scalars["String"]>;
  mfcId_ne?: InputMaybe<Scalars["String"]>;
  mfcId_nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  price?: InputMaybe<Scalars["Int"]>;
  price_exists?: InputMaybe<Scalars["Boolean"]>;
  price_gt?: InputMaybe<Scalars["Int"]>;
  price_gte?: InputMaybe<Scalars["Int"]>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  price_lt?: InputMaybe<Scalars["Int"]>;
  price_lte?: InputMaybe<Scalars["Int"]>;
  price_ne?: InputMaybe<Scalars["Int"]>;
  price_nin?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  releaseDate?: InputMaybe<Scalars["DateTime"]>;
  releaseDate_exists?: InputMaybe<Scalars["Boolean"]>;
  releaseDate_gt?: InputMaybe<Scalars["DateTime"]>;
  releaseDate_gte?: InputMaybe<Scalars["DateTime"]>;
  releaseDate_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  releaseDate_lt?: InputMaybe<Scalars["DateTime"]>;
  releaseDate_lte?: InputMaybe<Scalars["DateTime"]>;
  releaseDate_ne?: InputMaybe<Scalars["DateTime"]>;
  releaseDate_nin?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  shop?: InputMaybe<Scalars["String"]>;
  shop_exists?: InputMaybe<Scalars["Boolean"]>;
  shop_gt?: InputMaybe<Scalars["String"]>;
  shop_gte?: InputMaybe<Scalars["String"]>;
  shop_in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  shop_lt?: InputMaybe<Scalars["String"]>;
  shop_lte?: InputMaybe<Scalars["String"]>;
  shop_ne?: InputMaybe<Scalars["String"]>;
  shop_nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  status?: InputMaybe<Scalars["String"]>;
  status_exists?: InputMaybe<Scalars["Boolean"]>;
  status_gt?: InputMaybe<Scalars["String"]>;
  status_gte?: InputMaybe<Scalars["String"]>;
  status_in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  status_lt?: InputMaybe<Scalars["String"]>;
  status_lte?: InputMaybe<Scalars["String"]>;
  status_ne?: InputMaybe<Scalars["String"]>;
  status_nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]>;
  title_gt?: InputMaybe<Scalars["String"]>;
  title_gte?: InputMaybe<Scalars["String"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  title_lt?: InputMaybe<Scalars["String"]>;
  title_lte?: InputMaybe<Scalars["String"]>;
  title_ne?: InputMaybe<Scalars["String"]>;
  title_nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export enum FigureSortByInput {
  MfcidAsc = "MFCID_ASC",
  MfcidDesc = "MFCID_DESC",
  PriceAsc = "PRICE_ASC",
  PriceDesc = "PRICE_DESC",
  ReleasedateAsc = "RELEASEDATE_ASC",
  ReleasedateDesc = "RELEASEDATE_DESC",
  ShopAsc = "SHOP_ASC",
  ShopDesc = "SHOP_DESC",
  StatusAsc = "STATUS_ASC",
  StatusDesc = "STATUS_DESC",
  TitleAsc = "TITLE_ASC",
  TitleDesc = "TITLE_DESC",
  IdAsc = "_ID_ASC",
  IdDesc = "_ID_DESC",
}

export type FigureUpdateInput = {
  _id?: InputMaybe<Scalars["ObjectId"]>;
  _id_unset?: InputMaybe<Scalars["Boolean"]>;
  mfcId?: InputMaybe<Scalars["String"]>;
  mfcId_unset?: InputMaybe<Scalars["Boolean"]>;
  price?: InputMaybe<Scalars["Int"]>;
  price_inc?: InputMaybe<Scalars["Int"]>;
  price_unset?: InputMaybe<Scalars["Boolean"]>;
  releaseDate?: InputMaybe<Scalars["DateTime"]>;
  releaseDate_unset?: InputMaybe<Scalars["Boolean"]>;
  shop?: InputMaybe<Scalars["String"]>;
  shop_unset?: InputMaybe<Scalars["Boolean"]>;
  status?: InputMaybe<Scalars["String"]>;
  status_unset?: InputMaybe<Scalars["Boolean"]>;
  title?: InputMaybe<Scalars["String"]>;
  title_unset?: InputMaybe<Scalars["Boolean"]>;
};

export type InsertManyPayload = {
  __typename?: "InsertManyPayload";
  insertedIds: Array<Maybe<Scalars["ObjectId"]>>;
};

export type Mutation = {
  __typename?: "Mutation";
  deleteManyFigures?: Maybe<DeleteManyPayload>;
  deleteOneFigure?: Maybe<Figure>;
  insertManyFigures?: Maybe<InsertManyPayload>;
  insertOneFigure?: Maybe<Figure>;
  replaceOneFigure?: Maybe<Figure>;
  updateManyFigures?: Maybe<UpdateManyPayload>;
  updateOneFigure?: Maybe<Figure>;
  upsertOneFigure?: Maybe<Figure>;
};

export type MutationDeleteManyFiguresArgs = {
  query?: InputMaybe<FigureQueryInput>;
};

export type MutationDeleteOneFigureArgs = {
  query: FigureQueryInput;
};

export type MutationInsertManyFiguresArgs = {
  data: Array<FigureInsertInput>;
};

export type MutationInsertOneFigureArgs = {
  data: FigureInsertInput;
};

export type MutationReplaceOneFigureArgs = {
  data: FigureInsertInput;
  query?: InputMaybe<FigureQueryInput>;
};

export type MutationUpdateManyFiguresArgs = {
  query?: InputMaybe<FigureQueryInput>;
  set: FigureUpdateInput;
};

export type MutationUpdateOneFigureArgs = {
  query?: InputMaybe<FigureQueryInput>;
  set: FigureUpdateInput;
};

export type MutationUpsertOneFigureArgs = {
  data: FigureInsertInput;
  query?: InputMaybe<FigureQueryInput>;
};

export type Query = {
  __typename?: "Query";
  figure?: Maybe<Figure>;
  figures: Array<Maybe<Figure>>;
};

export type QueryFigureArgs = {
  query?: InputMaybe<FigureQueryInput>;
};

export type QueryFiguresArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  query?: InputMaybe<FigureQueryInput>;
  sortBy?: InputMaybe<FigureSortByInput>;
};

export type UpdateManyPayload = {
  __typename?: "UpdateManyPayload";
  matchedCount: Scalars["Int"];
  modifiedCount: Scalars["Int"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  DeleteManyPayload: ResolverTypeWrapper<DeleteManyPayload>;
  Figure: ResolverTypeWrapper<Figure>;
  FigureInsertInput: FigureInsertInput;
  FigureQueryInput: FigureQueryInput;
  FigureSortByInput: FigureSortByInput;
  FigureUpdateInput: FigureUpdateInput;
  InsertManyPayload: ResolverTypeWrapper<InsertManyPayload>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars["ObjectId"]>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  UpdateManyPayload: ResolverTypeWrapper<UpdateManyPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  DateTime: Scalars["DateTime"];
  DeleteManyPayload: DeleteManyPayload;
  Figure: Figure;
  FigureInsertInput: FigureInsertInput;
  FigureQueryInput: FigureQueryInput;
  FigureUpdateInput: FigureUpdateInput;
  InsertManyPayload: InsertManyPayload;
  Int: Scalars["Int"];
  Mutation: {};
  ObjectId: Scalars["ObjectId"];
  Query: {};
  String: Scalars["String"];
  UpdateManyPayload: UpdateManyPayload;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type DeleteManyPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DeleteManyPayload"] = ResolversParentTypes["DeleteManyPayload"]
> = {
  deletedCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FigureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Figure"] = ResolversParentTypes["Figure"]
> = {
  _id?: Resolver<ResolversTypes["ObjectId"], ParentType, ContextType>;
  mfcId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  shop?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InsertManyPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InsertManyPayload"] = ResolversParentTypes["InsertManyPayload"]
> = {
  insertedIds?: Resolver<
    Array<Maybe<ResolversTypes["ObjectId"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  deleteManyFigures?: Resolver<
    Maybe<ResolversTypes["DeleteManyPayload"]>,
    ParentType,
    ContextType,
    Partial<MutationDeleteManyFiguresArgs>
  >;
  deleteOneFigure?: Resolver<
    Maybe<ResolversTypes["Figure"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteOneFigureArgs, "query">
  >;
  insertManyFigures?: Resolver<
    Maybe<ResolversTypes["InsertManyPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInsertManyFiguresArgs, "data">
  >;
  insertOneFigure?: Resolver<
    Maybe<ResolversTypes["Figure"]>,
    ParentType,
    ContextType,
    RequireFields<MutationInsertOneFigureArgs, "data">
  >;
  replaceOneFigure?: Resolver<
    Maybe<ResolversTypes["Figure"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReplaceOneFigureArgs, "data">
  >;
  updateManyFigures?: Resolver<
    Maybe<ResolversTypes["UpdateManyPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateManyFiguresArgs, "set">
  >;
  updateOneFigure?: Resolver<
    Maybe<ResolversTypes["Figure"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOneFigureArgs, "set">
  >;
  upsertOneFigure?: Resolver<
    Maybe<ResolversTypes["Figure"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpsertOneFigureArgs, "data">
  >;
};

export interface ObjectIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ObjectId"], any> {
  name: "ObjectId";
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  figure?: Resolver<
    Maybe<ResolversTypes["Figure"]>,
    ParentType,
    ContextType,
    Partial<QueryFigureArgs>
  >;
  figures?: Resolver<
    Array<Maybe<ResolversTypes["Figure"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryFiguresArgs, "limit">
  >;
};

export type UpdateManyPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdateManyPayload"] = ResolversParentTypes["UpdateManyPayload"]
> = {
  matchedCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  modifiedCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  DeleteManyPayload?: DeleteManyPayloadResolvers<ContextType>;
  Figure?: FigureResolvers<ContextType>;
  InsertManyPayload?: InsertManyPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  UpdateManyPayload?: UpdateManyPayloadResolvers<ContextType>;
};

export type AllFiguresQueryVariables = Exact<{ [key: string]: never }>;

export type AllFiguresQuery = {
  __typename?: "Query";
  figures: Array<{
    __typename?: "Figure";
    mfcId: string;
    title: string;
    price: number;
    shop: string;
    status: string;
    releaseDate: any;
  } | null>;
};

export const AllFiguresDocument = gql`
  query AllFigures {
    figures(query: { status: "Ordered" }, sortBy: RELEASEDATE_ASC) {
      mfcId
      title
      price
      shop
      status
      releaseDate
    }
  }
`;

/**
 * __useAllFiguresQuery__
 *
 * To run a query within a React component, call `useAllFiguresQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFiguresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFiguresQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllFiguresQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AllFiguresQuery,
    AllFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllFiguresQuery, AllFiguresQueryVariables>(
    AllFiguresDocument,
    options
  );
}
export function useAllFiguresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllFiguresQuery,
    AllFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllFiguresQuery, AllFiguresQueryVariables>(
    AllFiguresDocument,
    options
  );
}
export type AllFiguresQueryHookResult = ReturnType<typeof useAllFiguresQuery>;
export type AllFiguresLazyQueryHookResult = ReturnType<
  typeof useAllFiguresLazyQuery
>;
export type AllFiguresQueryResult = Apollo.QueryResult<
  AllFiguresQuery,
  AllFiguresQueryVariables
>;
