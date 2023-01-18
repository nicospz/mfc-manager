import { GetServerSideProps } from 'next';
import UpcomingFigures from '@/components/UpcomingFigures';
import { getUpcomingFigures } from '@/hooks/useUpcomingFigures';
import { FigureCollectionType } from '@/pages/api/scraper';

interface UpcomingFiguresPageProps {
  upcomingFiguresInitialData: FigureCollectionType
}

const UpcomingFiguresPage: React.FC<UpcomingFiguresPageProps> = ({
  upcomingFiguresInitialData
}) => {
  return (
    <UpcomingFigures upcomingFiguresInitialData={upcomingFiguresInitialData} />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const upcomingFiguresInitialData = await getUpcomingFigures(context.req);

  return {
    props: {
      upcomingFiguresInitialData
    }
  };
};

export default UpcomingFiguresPage;
