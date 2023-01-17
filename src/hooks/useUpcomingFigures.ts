import { FigureCollectionType } from '@/pages/api/scraper';
import parse from 'date-fns/parse';
import { IncomingMessage } from 'http';
import absoluteUrl from 'next-absolute-url';
import { useQuery } from 'react-query';

export const getUpcomingFigures = async (req?: IncomingMessage) => {
  let url = '/api/upcoming-figures';
  if (req != null) {
    const { origin } = absoluteUrl(req, req.headers.host);
    url = `${origin}${url}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data as FigureCollectionType;
};

const useUpcomingFigures = (initialData: FigureCollectionType) => {
  const { data: upcomingFigures, isLoading } = useQuery<FigureCollectionType>({
    queryKey: ['upcomingFigures'],
    queryFn: async () => await getUpcomingFigures(),
    initialData
  });

  // calculate monthly sum of figure prices per year
  const monthlySums: Partial<Record<number, Record<number, number>>> = {};
  upcomingFigures?.figures?.reduce((acc, figure) => {
    const date = parse(figure.releaseDate, 'yyyy-MM-dd', new Date());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const accYear = acc[year] ?? {};

    if (!accYear[month]) {
      accYear[month] = 0;
    }
    accYear[month] += figure.price;
    acc[year] = accYear;
    return acc;
  }, monthlySums);
  // fill empty months with 0
  Object.keys(monthlySums).forEach((year) => {
    for (let i = 1; i <= 12; i++) {
      if (monthlySums?.[parseInt(year)]?.[i] === 0) {
        const monthlySumsYear = monthlySums[parseInt(year)];
        if (monthlySumsYear !== undefined) {
          monthlySumsYear[i] = 0;
        }
      }
    }
  });

  return {
    upcomingFigures,
    isLoading,
    monthlySums
  };
};

export default useUpcomingFigures;
