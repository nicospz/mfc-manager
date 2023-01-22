import classNames from "classnames";
import React from "react";
import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import format from "date-fns/format";
import { formatPrice } from "@/helpers/format";
import { Figure as FigureType } from "@/graphql-types";

interface FigureProps {
  className?: string;
  mfcId: FigureType["mfcId"];
  title: FigureType["title"];
  releaseDate: FigureType["releaseDate"];
  price: FigureType["price"];
}

const Figure: React.FC<FigureProps> = ({
  className,
  mfcId,
  title,
  releaseDate,
  price,
}) => {
  return (
    <a
      href={`https://myfigurecollection.net/item/${mfcId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        className,
        "flex gap-4 p-2 rounded-lg bg-slate-50 h-23"
      )}
    >
      <img
        alt={title}
        src={`https://static.myfigurecollection.net/upload/items/${mfcId}.jpg`}
        className="h-full rounded-md"
      />
      <div className="flex flex-col justify-between">
        <span className="line-clamp-2">{title}</span>
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <>
              <FontAwesomeIcon icon={faCalendar} />
              {format(new Date(releaseDate), "yyyy-MM-dd")}
            </>
          </span>
          <span className="flex items-center">{formatPrice(price)}</span>
        </div>
      </div>
    </a>
  );
};

export default Figure;
