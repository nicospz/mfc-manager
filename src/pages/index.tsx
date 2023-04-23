import OrderedFigures from "@components/OrderedFigures";
import {
  OrderedFiguresDocument,
  type OrderedFiguresQuery,
} from "@graphql-types";
import { addApolloState, initializeApollo } from "@lib/apolloClient";

const OrderedFiguresPage: React.FC = () => {
  return <OrderedFigures />;
};

export default OrderedFiguresPage;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query<OrderedFiguresQuery>({
    query: OrderedFiguresDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    // revalidate: 1,
  });
}
