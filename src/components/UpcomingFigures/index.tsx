import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faSpinner,
} from "@fortawesome/pro-regular-svg-icons";
import dynamic from "next/dynamic";
import { useSwipeable } from "react-swipeable";
import Figure from "@/components/Figure";
import { formatPrice } from "@/helpers/format";
import useUpcomingFigures from "@/hooks/useUpcomingFigures";
import Button from "@/components/Button";

const Chart = dynamic(import("@/components/UpcomingFigures/Chart"), {
  ssr: false,
});

const UpcomingFigures: React.FC = () => {
  const { upcomingFigures, monthlySums, isLoading } = useUpcomingFigures();
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = React.useState(
    new Date().getMonth() + 1
  );

  const filteredFiguresByDate = upcomingFigures?.figures?.filter((figure) => {
    const figureDate = new Date(figure.releaseDate);
    // Check if the figure is in the current month
    return (
      figureDate.getFullYear() === currentYear &&
      figureDate.getMonth() + 1 === currentMonth
    );
  });

  const currentYearSums = monthlySums?.[currentYear];
  const currentMonthSum = currentYearSums?.[currentMonth];

  let previousMonth = currentMonth - 1;
  let previousYear: number;
  if (previousMonth === 0) {
    previousMonth = 12;
    previousYear = currentYear - 1;
  } else {
    previousYear = currentYear;
  }

  let nextMonth = currentMonth + 1;
  let nextYear: number;
  if (nextMonth === 13) {
    nextMonth = 1;
    nextYear = currentYear + 1;
  } else {
    nextYear = currentYear;
  }

  const isHandlePrevDisabled = monthlySums[previousYear] === undefined;
  const isHandleNextDisabled = monthlySums[nextYear] === undefined;

  const handlePrevMonth = () => {
    if (!isHandlePrevDisabled) {
      setCurrentMonth(previousMonth);
      setCurrentYear(previousYear);
    }
  };

  const handleNextMonth = () => {
    if (!isHandleNextDisabled) {
      setCurrentMonth(nextMonth);
      setCurrentYear(nextYear);
    }
  };

  // handle arrow keys handler
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevMonth();
      } else if (event.key === "ArrowRight") {
        handleNextMonth();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const swipeHandlers = useSwipeable({
    onSwipeStart: (eventData) => {
      if (eventData.dir === "Left") handleNextMonth();
      else if (eventData.dir === "Right") handlePrevMonth();
      if (eventData.dir === "Up" || eventData.dir === "Down") {
        window.scrollTo(0, 0);
      }
    },
    preventScrollOnSwipe: true,
  });

  if (isLoading) {
    //  Add loading state div containing vertically horizontally centered spinner
    return (
      <div className="flex items-center justify-center w-full h-full">
        <FontAwesomeIcon icon={faSpinner} size="2x" spin />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-2 px-5 py-4">
      <div className="flex items-center gap-2">
        {/* Icon to decrement month */}
        <Button disabled={isHandlePrevDisabled} onClick={handlePrevMonth}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <span className="flex items-center h-10 px-3 rounded-lg bg-slate-50">
          {currentYear}-{`0${currentMonth}`.slice(-2)}
        </span>
        {/* Icon to increment month */}
        <Button disabled={isHandleNextDisabled} onClick={handleNextMonth}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </div>
      {/* Total price */}
      {currentMonthSum !== undefined && (
        <div className="text-3xl text-slate-100">
          {formatPrice(currentMonthSum)}
        </div>
      )}
      {/* Swipeable div */}
      <div className="flex flex-col flex-1" {...swipeHandlers}>
        {/* Chart */}
        {!!currentYearSums && (
          <Chart
            data={Object.entries(currentYearSums).map(([month, price]) => ({
              month: parseInt(month),
              price,
            }))}
            currentMonth={currentMonth}
            onMonthClick={(monthData) => {
              setCurrentMonth(monthData.month);
            }}
          />
        )}
        {/* Figure list */}
        <div className="flex-1">
          <div className="grid gap-2 md:grid-cols-2">
            {filteredFiguresByDate?.map((figure) => (
              <Figure key={figure.id} {...figure} className="w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingFigures;
