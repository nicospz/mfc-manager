import Figure from "@/components/Figure";
import { formatPrice } from "@/helpers/format";
import useUpcomingFigures from "@/hooks/useUpcomingFigures";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/pro-solid-svg-icons";
import Button from "@/components/Button";

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
      <Button
        disabled={isLoading}
        className=""
        onClick={refreshFigureCollection}
      >
        Refresh Figure Collection
        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
      </Button>
      <div className="flex items-center gap-2">
        {/* Icon to decrement month */}
        <Button
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentMonth(12);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <span className="flex items-center h-10 px-3 rounded-lg bg-slate-50">
          {currentYear}-{("0" + currentMonth).slice(-2)}
        </span>
        {/* Icon to increment month */}
        <Button
          onClick={() => {
            if (currentMonth === 12) {
              setCurrentMonth(1);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
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
