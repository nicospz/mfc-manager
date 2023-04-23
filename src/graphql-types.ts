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
  imageUrl?: Maybe<Scalars["String"]>;
  paymentDate?: Maybe<Scalars["DateTime"]>;
  price: Scalars["Float"];
  releaseDate?: Maybe<Scalars["DateTime"]>;
  score?: Maybe<Scalars["Float"]>;
  shop: Scalars["String"];
  status: Status;
  title: Scalars["String"];
  wishability?: Maybe<Scalars["Float"]>;
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
  imageUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  paymentDate?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  releaseDate?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  score?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  shop?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  wishability?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
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

export type OrderedFiguresQueryVariables = Exact<{ [key: string]: never }>;

export type OrderedFiguresQuery = {
  __typename?: "Query";
  figures: Array<{
    __typename?: "Figure";
    id: number;
    title: string;
    price: number;
    shop: string;
    status: Status;
    releaseDate?: any | null;
    paymentDate?: any | null;
    imageUrl?: string | null;
  }>;
};

export type OwnedFiguresQueryVariables = Exact<{ [key: string]: never }>;

export type OwnedFiguresQuery = {
  __typename?: "Query";
  figures: Array<{
    __typename?: "Figure";
    id: number;
    title: string;
    price: number;
    shop: string;
    status: Status;
    releaseDate?: any | null;
    paymentDate?: any | null;
    imageUrl?: string | null;
    score?: number | null;
  }>;
};

export type WishedFiguresQueryVariables = Exact<{ [key: string]: never }>;

export type WishedFiguresQuery = {
  __typename?: "Query";
  figures: Array<{
    __typename?: "Figure";
    id: number;
    title: string;
    price: number;
    shop: string;
    status: Status;
    releaseDate?: any | null;
    paymentDate?: any | null;
    imageUrl?: string | null;
    wishability?: number | null;
  }>;
};

export const OrderedFiguresDocument = gql`
  query orderedFigures {
    figures(status: "Ordered") {
      id
      title
      price
      shop
      status
      releaseDate
      paymentDate
      imageUrl
    }
  }
`;

/**
 * __useOrderedFiguresQuery__
 *
 * To run a query within a React component, call `useOrderedFiguresQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderedFiguresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderedFiguresQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderedFiguresQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OrderedFiguresQuery,
    OrderedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrderedFiguresQuery, OrderedFiguresQueryVariables>(
    OrderedFiguresDocument,
    options
  );
}
export function useOrderedFiguresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrderedFiguresQuery,
    OrderedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrderedFiguresQuery, OrderedFiguresQueryVariables>(
    OrderedFiguresDocument,
    options
  );
}
export type OrderedFiguresQueryHookResult = ReturnType<
  typeof useOrderedFiguresQuery
>;
export type OrderedFiguresLazyQueryHookResult = ReturnType<
  typeof useOrderedFiguresLazyQuery
>;
export type OrderedFiguresQueryResult = Apollo.QueryResult<
  OrderedFiguresQuery,
  OrderedFiguresQueryVariables
>;
export const OwnedFiguresDocument = gql`
  query ownedFigures {
    figures(status: "Owned") {
      id
      title
      price
      shop
      status
      releaseDate
      paymentDate
      imageUrl
      score
    }
  }
`;

/**
 * __useOwnedFiguresQuery__
 *
 * To run a query within a React component, call `useOwnedFiguresQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnedFiguresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnedFiguresQuery({
 *   variables: {
 *   },
 * });
 */
export function useOwnedFiguresQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OwnedFiguresQuery,
    OwnedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OwnedFiguresQuery, OwnedFiguresQueryVariables>(
    OwnedFiguresDocument,
    options
  );
}
export function useOwnedFiguresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OwnedFiguresQuery,
    OwnedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OwnedFiguresQuery, OwnedFiguresQueryVariables>(
    OwnedFiguresDocument,
    options
  );
}
export type OwnedFiguresQueryHookResult = ReturnType<
  typeof useOwnedFiguresQuery
>;
export type OwnedFiguresLazyQueryHookResult = ReturnType<
  typeof useOwnedFiguresLazyQuery
>;
export type OwnedFiguresQueryResult = Apollo.QueryResult<
  OwnedFiguresQuery,
  OwnedFiguresQueryVariables
>;
export const WishedFiguresDocument = gql`
  query wishedFigures {
    figures(status: "Wished") {
      id
      title
      price
      shop
      status
      releaseDate
      paymentDate
      imageUrl
      wishability
    }
  }
`;

/**
 * __useWishedFiguresQuery__
 *
 * To run a query within a React component, call `useWishedFiguresQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishedFiguresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishedFiguresQuery({
 *   variables: {
 *   },
 * });
 */
export function useWishedFiguresQuery(
  baseOptions?: Apollo.QueryHookOptions<
    WishedFiguresQuery,
    WishedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WishedFiguresQuery, WishedFiguresQueryVariables>(
    WishedFiguresDocument,
    options
  );
}
export function useWishedFiguresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WishedFiguresQuery,
    WishedFiguresQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WishedFiguresQuery, WishedFiguresQueryVariables>(
    WishedFiguresDocument,
    options
  );
}
export type WishedFiguresQueryHookResult = ReturnType<
  typeof useWishedFiguresQuery
>;
export type WishedFiguresLazyQueryHookResult = ReturnType<
  typeof useWishedFiguresLazyQuery
>;
export type WishedFiguresQueryResult = Apollo.QueryResult<
  WishedFiguresQuery,
  WishedFiguresQueryVariables
>;
