import { formatPrice } from "@/helpers/format";
import { FigureType } from "@/pages/api/scraper";
import React from "react";

type FigureProps = {
  id: FigureType["id"];
  title: FigureType["title"];
  releaseDate: FigureType["releaseDate"];
  price: FigureType["price"];
};

const Figure: React.FC<FigureProps> = ({ title, releaseDate, price }) => {
  return (
    <div>
      {releaseDate} - {formatPrice(price)} - {title}
    </div>
  );
};

export default Figure;
