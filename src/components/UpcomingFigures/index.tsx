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
import Chart from "@/components/UpcomingFigures/Chart";

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
    <div className="flex flex-col items-center justify-center w-full gap-2 px-5 py-4">
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
      {/* Chart */}
      <Chart
        data={[
          {
            month: 1,
            year: 2013,
            price: 101502,
          },
          {
            month: 2,
            year: 2013,
            price: 111786,
          },
          {
            month: 3,
            year: 2013,
            price: 107880,
          },
          {
            month: 4,
            year: 2013,
            price: 88180,
          },
          {
            month: 5,
            year: 2013,
            price: 42200,
          },
          {
            month: 6,
            year: 2013,
            price: 36770,
          },
          {
            month: 7,
            year: 2013,
            price: 116190,
          },
          {
            month: 8,
            year: 2013,
            price: 58120,
          },
          {
            month: 9,
            year: 2013,
            price: 34200,
          },
          {
            month: 10,
            year: 2013,
            price: 95060,
          },
          {
            month: 11,
            year: 2013,
            price: 0,
          },
          {
            month: 12,
            year: 2013,
            price: 96990,
          },
        ]}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthClick={(monthData) => {
          console.log(monthData);
          return setCurrentMonth(monthData.month);
        }}
      />
      {/* Figure list */}
      <div className="grid gap-2 md:grid-cols-2">
        {filteredFiguresByDate &&
          filteredFiguresByDate.map((figure) => (
            <Figure key={figure.id} {...figure} className="w-full" />
          ))}
      </div>
    </div>
  );
};

export default UpcomingFigures;
