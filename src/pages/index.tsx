import OrderedFigures from "@components/OrderedFigures";
import {
  QueryOrderedFiguresDocument,
  type QueryOrderedFiguresQuery,
} from "@graphql-types";
import { addApolloState, initializeApollo } from "@lib/apolloClient";

const OrderedFiguresPage: React.FC = () => {
  return <OrderedFigures />;
};

export default OrderedFiguresPage;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query<QueryOrderedFiguresQuery>({
    query: QueryOrderedFiguresDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    // revalidate: 1,
  });
}
