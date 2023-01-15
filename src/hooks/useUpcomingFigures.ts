import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FiguresData } from "@/pages/api/scraper";
import parse from "date-fns/parse";
import { useState } from "react";

const useUpcomingFigures = (): [FiguresData, () => void, boolean] => {
  const [figuresData, setStoredValue] =
    useLocalStorage<FiguresData>("upcomingFigures");
  const [isLoading, setIsLoading] = useState(false);

  const refreshUpcomingFigures = async () => {
    setIsLoading(true);
    const scraper = await fetch("/api/scraper");
    const figuresData = (await scraper.json()) as FiguresData;
    const { figures, updatedAt } = figuresData;
    setStoredValue({
      updatedAt,
      figures: figures
        .filter((figure) => figure.Status === "Ordered")
        .map((figure) => ({
          ...figure,
          // Replace 00 from date string with 28 to avoid parsing errors
          "Release Date": figure["Release Date"].replace(
            /(\d{4})-(\d{2})-00/,
            "$1-$2-28"
          ),
        }))
        .sort(function (a, b) {
          const dateA = parse(a["Release Date"], "yyyy-MM-dd", new Date());
          const dateB = parse(b["Release Date"], "yyyy-MM-dd", new Date());
          console.log(dateA, dateB);
          return dateA.getTime() - dateB.getTime();
        }),
    });
    setIsLoading(true);
  };

  return [figuresData, refreshUpcomingFigures, isLoading];
};

export default useUpcomingFigures;
