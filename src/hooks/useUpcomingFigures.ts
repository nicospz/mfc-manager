import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FigureCollectionType } from "@/pages/api/scraper";
import parse from "date-fns/parse";
import { useState } from "react";

const useUpcomingFigures = (): [
  FigureCollectionType,
  () => void,
  boolean,
  {
    [year: number]: {
      [month: number]: number;
    };
  }
] => {
  const [figuresData, setStoredValue] =
    useLocalStorage<FigureCollectionType>("upcomingFigures");
  const [isLoading, setIsLoading] = useState(false);

  const refreshUpcomingFigures = async () => {
    setIsLoading(true);
    let figureCollection: FigureCollectionType;
    try {
      const scraper = await fetch("/api/scraper");
      figureCollection = await scraper.json();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }
    const { figures, updatedAt } = figureCollection;
    setStoredValue({
      updatedAt,
      figures: figures.filter((figure) => figure.status === "Ordered"),
    });
    setIsLoading(false);
  };
  // calculate monthly sum of figure prices per year
  const monthlySums: { [year: number]: { [month: number]: number } } = {};
  figuresData?.figures?.reduce((acc, figure) => {
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

  return [figuresData, refreshUpcomingFigures, isLoading, monthlySums];
};

export default useUpcomingFigures;
