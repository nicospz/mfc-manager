import { FigureCollectionType } from "@/pages/api/scraper";
import parse from "date-fns/parse";
import { IncomingMessage } from "http";
import absoluteUrl from "next-absolute-url";
import { QueryFunctionContext, useQuery } from "react-query";

export const getUpcomingFigures = async (req?: IncomingMessage) => {
  let url = "/api/upcoming-figures";
  if (req) {
    const { origin } = absoluteUrl(req, req.headers.host);
    url = `${origin}${url}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const useUpcomingFigures = (initialData: FigureCollectionType) => {
  const { data: upcomingFigures, isLoading } = useQuery<FigureCollectionType>({
    queryKey: ["upcomingFigures"],
    queryFn: () => getUpcomingFigures(),
    initialData: initialData,
  });

  const refreshUpcomingFigures = async () => {
    let figureCollection: FigureCollectionType;
    try {
      const scraper = await fetch("/api/scraper");
      figureCollection = await scraper.json();
    } catch (error) {
      console.error(error);
      return;
    }
    const { figures, updatedAt } = figureCollection;
  };
  // calculate monthly sum of figure prices per year
  const monthlySums: { [year: number]: { [month: number]: number } } = {};
  upcomingFigures?.figures?.reduce((acc, figure) => {
    const date = parse(figure.releaseDate, "yyyy-MM-dd", new Date());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = 0;
    }
    acc[year][month] += figure.price;
    return acc;
  }, monthlySums);
  // fill empty months with 0
  Object.keys(monthlySums).forEach((year) => {
    for (let i = 1; i <= 12; i++) {
      if (!monthlySums[parseInt(year)][i]) {
        monthlySums[parseInt(year)][i] = 0;
      }
    }
  });

  return {
    upcomingFigures,
    isLoading,
    monthlySums,
  };
};

export default useUpcomingFigures;
