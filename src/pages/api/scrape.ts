import { Figures, scrapeCollection } from "@/helpers/scraper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Figures>
) {
  // Get data from your database
  const figures = await scrapeCollection();
  res.status(200).json(figures);
}
