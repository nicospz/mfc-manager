import OwnedFigures from "@components/OwnedFigures";
import { OwnedFiguresDocument, type OwnedFiguresQuery } from "@graphql-types";
import { addApolloState, initializeApollo } from "@lib/apolloClient";

const OwnedFiguresPage: React.FC = () => {
  return <OwnedFigures />;
};

export default OwnedFiguresPage;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query<OwnedFiguresQuery>({
    query: OwnedFiguresDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    // revalidate: 1,
  });
}
