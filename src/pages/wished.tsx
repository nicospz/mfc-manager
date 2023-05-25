import WishedFigures from '@components/WishedFigures';
import { WishedFiguresDocument, type WishedFiguresQuery } from '@graphql-types';
import { addApolloState, initializeApollo } from '@lib/apolloClient';

const WishedFiguresPage: React.FC = () => {
    return <WishedFigures />;
};

export default WishedFiguresPage;

export async function getServerSideProps() {
    const apolloClient = initializeApollo();
    await apolloClient.query<WishedFiguresQuery>({
        query: WishedFiguresDocument,
    });

    return addApolloState(apolloClient, {
        props: {},
        // revalidate: 1,
    });
}
