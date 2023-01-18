import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import Figure from '@/components/Figure';
import { formatPrice } from '@/helpers/format';
import useUpcomingFigures from '@/hooks/useUpcomingFigures';
import Button from '@/components/Button';
import Chart from '@/components/UpcomingFigures/Chart';
import { FigureCollectionType } from '@/pages/api/scraper';

interface UpcomingFiguresProps {
  upcomingFiguresInitialData: FigureCollectionType;

}

const UpcomingFigures: React.FC<UpcomingFiguresProps> = ({
  upcomingFiguresInitialData
}) => {
  const { upcomingFigures, monthlySums } = useUpcomingFigures(
    upcomingFiguresInitialData
  );
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

  const currentYearSums = monthlySums?.[currentYear];
  const currentMonthSum = currentYearSums?.[currentMonth];

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 px-5 py-4">
      <div className="flex items-center gap-2">
        {/* Icon to decrement month */}
        <Button
          disabled={monthlySums[previousYear] === undefined}
          onClick={() => {
            setCurrentMonth(previousMonth);
            setCurrentYear(previousYear);
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <span className="flex items-center h-10 px-3 rounded-lg bg-slate-50">
          {currentYear}-{(`0${currentMonth}`).slice(-2)}
        </span>
        {/* Icon to increment month */}
        <Button
          disabled={monthlySums[nextYear] === undefined}
          onClick={() => {
            setCurrentMonth(nextMonth);
            setCurrentYear(nextYear);
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </div>
      {/* Total price */}
      {currentMonthSum !== undefined &&
      <div className="text-3xl text-slate-100">
        {formatPrice(currentMonthSum)}
      </div>}
      {/* Chart */}
      {!!currentYearSums && (
        <Chart
          data={Object.entries(currentYearSums).map(
            ([month, price]) => ({
              month: parseInt(month),
              price
            })
          )}
          currentMonth={currentMonth}
          onMonthClick={(monthData) => {
            setCurrentMonth(monthData.month);
          }}
        />
      )}
      {/* Figure list */}
      <div className="grid gap-2 md:grid-cols-2">
        {filteredFiguresByDate?.map((figure) => (
            <Figure key={figure.id} {...figure} className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default UpcomingFigures;
