import useUpcomingFigures from "@/hooks/useUpcomingFigures";
import React from "react";

const UpcomingFigures = () => {
  const [figuresData, refreshFigureCollection, isLoading] =
    useUpcomingFigures();

  return (
    <div className="flex w-full items-center flex-col justify-center">
      {figuresData &&
        figuresData.figures.map((figure) => (
          <div key={figure.ID}>
            {figure["Release Date"]} - {figure.Price} - {figure.Title}
          </div>
        ))}
      <button
        disabled={isLoading}
        className="rounded-lg bg-slate-200 px-3 py-2"
        onClick={refreshFigureCollection}
      >
        Refresh Figure Collection
      </button>
    </div>
  );
};

export default UpcomingFigures;
