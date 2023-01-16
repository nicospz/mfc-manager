import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FigureCollectionType } from "@/pages/api/scraper";
import parse from "date-fns/parse";
import { useState } from "react";

const useUpcomingFigures = (): [FigureCollectionType, () => void, boolean] => {
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
      figures: figures
        .filter((figure) => figure.status === "Ordered")
        .sort(function (a, b) {
          const dateA = parse(a.releaseDate, "yyyy-MM-dd", new Date());
          const dateB = parse(b.releaseDate, "yyyy-MM-dd", new Date());
          console.log(dateA, dateB);
          return dateA.getTime() - dateB.getTime();
        }),
    });
    setIsLoading(false);
  };

  return [figuresData, refreshUpcomingFigures, isLoading];
};

export default useUpcomingFigures;
