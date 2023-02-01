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

export type Figure = {
  __typename?: "Figure";
  id: Scalars["Float"];
  paymentDate?: Maybe<Scalars["DateTime"]>;
  price: Scalars["Float"];
  releaseDate: Scalars["DateTime"];
  shop: Scalars["String"];
  status: Status;
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  figures: Array<Figure>;
};

export type QueryFiguresArgs = {
  status?: InputMaybe<Scalars["String"]>;
};

/** Status of the figure. */
export enum Status {
  Ordered = "ORDERED",
  Owned = "OWNED",
  Wished = "WISHED",
}

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
  Figure: ResolverTypeWrapper<Figure>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Query: ResolverTypeWrapper<{}>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars["String"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  DateTime: Scalars["DateTime"];
  Figure: Figure;
  Float: Scalars["Float"];
  Query: {};
  String: Scalars["String"];
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type FigureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Figure"] = ResolversParentTypes["Figure"]
> = {
  id?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  paymentDate?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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
    Partial<QueryFiguresArgs>
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
    id: number;
    title: string;
    price: number;
    shop: string;
    status: Status;
    releaseDate: any;
    paymentDate?: any | null;
  }>;
};

export const QueryOrderedFiguresDocument = gql`
  query queryOrderedFigures {
    figures(status: "Ordered") {
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
