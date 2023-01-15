import { Figures, scrapeCollection } from "@/helpers/scraper";
import type { NextApiRequest, NextApiResponse } from "next";

export type FiguresData = {
  figures: Figures;
  updatedAt: Date;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FiguresData>
) {
  // Get data from your database
  const figures = await scrapeCollection();
  res.status(200).json({
    figures,
    updatedAt: new Date(),
  });
}
