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
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type EnumStatusFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type Figure = {
  __typename?: "Figure";
  id: Scalars["ID"];
  paymentDate?: Maybe<Scalars["DateTime"]>;
  price: Scalars["Int"];
  releaseDate?: Maybe<Scalars["DateTime"]>;
  shop: Scalars["String"];
  status: Status;
  title: Scalars["String"];
};

export type FigureWhereInput = {
  AND?: InputMaybe<Array<FigureWhereInput>>;
  NOT?: InputMaybe<Array<FigureWhereInput>>;
  OR?: InputMaybe<Array<FigureWhereInput>>;
  id?: InputMaybe<IntFilter>;
  paymentDate?: InputMaybe<DateTimeNullableFilter>;
  price?: InputMaybe<IntFilter>;
  releaseDate?: InputMaybe<DateTimeNullableFilter>;
  shop?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumStatusFilter>;
  title?: InputMaybe<StringFilter>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type NestedEnumStatusFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  figures: Array<Figure>;
};

export type QueryFiguresArgs = {
  where: FigureWhereInput;
};

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export enum Status {
  Ordered = "Ordered",
  Owned = "Owned",
  Wished = "Wished",
}

export type StringFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startsWith?: InputMaybe<Scalars["String"]>;
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
  DateTimeNullableFilter: DateTimeNullableFilter;
  EnumStatusFilter: EnumStatusFilter;
  Figure: ResolverTypeWrapper<Figure>;
  FigureWhereInput: FigureWhereInput;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  IntFilter: IntFilter;
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedEnumStatusFilter: NestedEnumStatusFilter;
  NestedIntFilter: NestedIntFilter;
  NestedStringFilter: NestedStringFilter;
  Query: ResolverTypeWrapper<{}>;
  QueryMode: QueryMode;
  Status: Status;
  String: ResolverTypeWrapper<Scalars["String"]>;
  StringFilter: StringFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  DateTime: Scalars["DateTime"];
  DateTimeNullableFilter: DateTimeNullableFilter;
  EnumStatusFilter: EnumStatusFilter;
  Figure: Figure;
  FigureWhereInput: FigureWhereInput;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  IntFilter: IntFilter;
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedEnumStatusFilter: NestedEnumStatusFilter;
  NestedIntFilter: NestedIntFilter;
  NestedStringFilter: NestedStringFilter;
  Query: {};
  String: Scalars["String"];
  StringFilter: StringFilter;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type FigureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Figure"] = ResolversParentTypes["Figure"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  paymentDate?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  releaseDate?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  shop?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  figures?: Resolver<
    Array<ResolversTypes["Figure"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFiguresArgs, "where">
  >;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Figure?: FigureResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

export type QueryOrderedFiguresQueryVariables = Exact<{ [key: string]: never }>;

export type QueryOrderedFiguresQuery = {
  __typename?: "Query";
  figures: Array<{
    __typename?: "Figure";
    id: string;
    title: string;
    price: number;
    shop: string;
    status: Status;
    releaseDate?: any | null;
    paymentDate?: any | null;
  }>;
};

export const QueryOrderedFiguresDocument = gql`
  query queryOrderedFigures {
    figures(where: { status: { equals: Ordered } }) {
      id
      title
      price
      shop
      status
      releaseDate
      paymentDate
    }
  }
`;

/**
 * __useQueryOrderedFiguresQuery__
 *
 * To run a query within a React component, call `useQueryOrderedFiguresQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryOrderedFiguresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryOrderedFiguresQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryOrderedFiguresQuery(
  baseOptions?: Apollo.QueryHookOptions<
    QueryOrderedFiguresQuery,
    QueryOrderedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    QueryOrderedFiguresQuery,
    QueryOrderedFiguresQueryVariables
  >(QueryOrderedFiguresDocument, options);
}
export function useQueryOrderedFiguresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QueryOrderedFiguresQuery,
    QueryOrderedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    QueryOrderedFiguresQuery,
    QueryOrderedFiguresQueryVariables
  >(QueryOrderedFiguresDocument, options);
}
export type QueryOrderedFiguresQueryHookResult = ReturnType<
  typeof useQueryOrderedFiguresQuery
>;
export type QueryOrderedFiguresLazyQueryHookResult = ReturnType<
  typeof useQueryOrderedFiguresLazyQuery
>;
export type QueryOrderedFiguresQueryResult = Apollo.QueryResult<
  QueryOrderedFiguresQuery,
  QueryOrderedFiguresQueryVariables
>;
