import { Figures, scrapeCollection } from "@/helpers/scraper";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

export type FigureType = {
  id: string;
  title: string;
  releaseDate: string;
  shop: string;
  price: string;
  paymentDate: string;
  status: string;
};

export type FigureCollectionType = {
  figures: Figures;
  updatedAt: Date;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FigureCollectionType>
) {
  // Get data from your database
  const figures = await scrapeCollection();
  res.status(200).json({
    figures: figures
      .map((figure) => _.mapKeys(figure, (v, k) => _.camelCase(k)))
      .map((figure) => ({
        ...figure,
        // Replace 00 from date string with 28 to avoid parsing errors
        releaseDate: figure.releaseDate.replace(
          /(\d{4})-(\d{2})-00/,
          "$1-$2-28"
        ),
      })) as FigureType[],
    updatedAt: new Date(),
  });
}
