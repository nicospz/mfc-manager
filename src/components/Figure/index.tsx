import { formatPrice } from "@/helpers/format";
import { FigureType } from "@/pages/api/scraper";
import React from "react";

type FigureProps = {
  id: FigureType["id"];
  title: FigureType["title"];
  releaseDate: FigureType["releaseDate"];
  price: FigureType["price"];
};

const Figure: React.FC<FigureProps> = ({ id, title, releaseDate, price }) => {
  return (
    <a
      href={`https://myfigurecollection.net/item/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-2 rounded-lg bg-slate-50"
    >
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={title}
        src={`https://static.myfigurecollection.net/upload/items/${id}.jpg`}
      />
      <div className="flex flex-col">
        <span>{title}</span>
        <span>{releaseDate}</span>
        <span>{formatPrice(price)}</span>
      </div>
    </a>
  );
};

export default Figure;
