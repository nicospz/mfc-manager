import classNames from "classnames";
import React from "react";
import format from "date-fns/format";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Figure as FigureType } from "@graphql-types";
import { formatPrice } from "@lib/format";

interface FigureProps {
  className?: string;
  id: FigureType["id"];
  title: FigureType["title"];
  releaseDate?: FigureType["releaseDate"];
  paymentDate?: FigureType["paymentDate"];
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
