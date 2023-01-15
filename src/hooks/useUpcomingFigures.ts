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
        .sort(function (a, b) {
          // Replace 00 from date string with 28 to avoid parsing errors
          const correctedDateA = a["Release Date"].replace(
            /(\d{4})-(\d{2})-00/,
            "$1-$2-28"
          );
          const correctedDateB = b["Release Date"].replace(
            /(\d{4})-(\d{2})-00/,
            "$1-$2-28"
          );
          const dateA = parse(correctedDateA, "yyyy-MM-dd", new Date());
          const dateB = parse(correctedDateB, "yyyy-MM-dd", new Date());
          console.log(dateA, dateB);
          return dateA.getTime() - dateB.getTime();
        }),
    });
    setIsLoading(true);
  };

  return [figuresData, refreshUpcomingFigures, isLoading];
};

export default useUpcomingFigures;
