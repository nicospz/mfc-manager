import classNames from "classnames";
import React from "react";
import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FigureType } from "@/pages/api/scraper";
import { formatPrice } from "@/helpers/format";

interface FigureProps {
  className?: string;
  id: FigureType["id"];
  title: FigureType["title"];
  releaseDate: FigureType["releaseDate"];
  price: FigureType["price"];
}

const Figure: React.FC<FigureProps> = ({
  className,
  id,
  title,
  releaseDate,
  price,
}) => {
  return (
    <a
      href={`https://myfigurecollection.net/item/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        className,
        "flex gap-4 p-2 rounded-lg bg-slate-50 h-23"
      )}
    >
      <img
        alt={title}
        src={`https://static.myfigurecollection.net/upload/items/${id}.jpg`}
        className="h-full rounded-md"
      />
      <div className="flex flex-col justify-between">
        <span className="line-clamp-2">{title}</span>
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendar} />
            {releaseDate}
          </span>
          <span className="flex items-center">{formatPrice(price)}</span>
        </div>
      </div>
    </a>
  );
};

export default Figure;
