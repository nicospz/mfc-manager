import Figure from "@/components/Figure";
import { formatPrice } from "@/helpers/format";
import useUpcomingFigures from "@/hooks/useUpcomingFigures";
import React from "react";

const UpcomingFigures = () => {
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = React.useState(
    new Date().getMonth() + 1
  );
  const [figureCollection, refreshFigureCollection, isLoading] =
    useUpcomingFigures();

  const filteredFiguresByDate = figureCollection?.figures.filter((figure) => {
    const figureDate = new Date(figure.releaseDate);
    // Check if the figure is in the current month
    return (
      figureDate.getFullYear() === currentYear &&
      figureDate.getMonth() + 1 === currentMonth
    );
  });

  // Total price for the month
  const priceForTheMonth = filteredFiguresByDate?.reduce(
    (total, figure) => total + parseInt(figure.price),
    0
  );

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <button
        disabled={isLoading}
        className="px-3 py-2 rounded-lg bg-slate-50"
        onClick={refreshFigureCollection}
      >
        Refresh Figure Collection
      </button>
      <div className="flex gap-2">
        {/* Icon to decrement month */}
        <button
          className="px-3 py-2 rounded-lg bg-slate-50"
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentMonth(12);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          &lt;
        </button>
        <span className="px-3 py-2 rounded-lg bg-slate-50">
          {currentYear}-{("0" + currentMonth).slice(-2)}
        </span>
        {/* Icon to increment month */}
        <button
          className="px-3 py-2 rounded-lg bg-slate-50"
          onClick={() => {
            if (currentMonth === 12) {
              setCurrentMonth(1);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          &gt;
        </button>
      </div>
      {/* Total price */}
      <div className="p-2 rounded-lg bg-slate-50">
        {formatPrice(priceForTheMonth)}
      </div>
      {/* Figure list */}
      <div className="flex flex-col gap-2">
        {filteredFiguresByDate &&
          filteredFiguresByDate.map((figure) => (
            <Figure key={figure.id} {...figure} />
          ))}
      </div>
    </div>
  );
};

export default UpcomingFigures;
