import classNames from "classnames";
import React from "react";
import format from "date-fns/format";
import { faCalendar, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Figure as FigureType } from "@graphql-types";
import { formatPrice } from "@lib/format";

interface FigureProps {
  className?: string;
  id: FigureType["id"];
  title: FigureType["title"];
  releaseDate?: FigureType["releaseDate"];
  paymentDate?: FigureType["paymentDate"];
  price?: FigureType["price"];
  imageUrl?: FigureType["imageUrl"];
  wishability?: FigureType["wishability"];
  score?: FigureType["score"];
}

const Figure: React.FC<FigureProps> = ({
  className,
  id,
  title,
  releaseDate,
  price,
  imageUrl,
  wishability,
  score,
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
      {imageUrl && (
        <img alt={title} src={imageUrl} className="h-full rounded-md" />
      )}
      <div className="flex flex-col justify-between w-full">
        <span className="line-clamp-2">{title}</span>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendar} />
              {format(new Date(releaseDate), "yyyy-MM-dd")}
            </span>
            {!!price && price !== 0 && (
              <span className="flex items-center">{formatPrice(price)}</span>
            )}
          </div>
          <div>
            {wishability !== undefined && wishability !== null && (
              <span className="flex items-center">
                {Array.from(Array(wishability)).map((i) => (
                  <FontAwesomeIcon key={i} icon={faHeart} />
                ))}
              </span>
            )}
            {score !== undefined && score !== null && (
              <span className="flex items-center">
                {Array.from(Array(score)).map((i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Figure;
