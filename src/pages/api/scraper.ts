import type { NextApiRequest, NextApiResponse } from "next";
import { scrapeCollection } from "@/helpers/scraper";
import { mongoDropAndImport } from "@/helpers/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method === "POST" || process.env.NODE_ENV === "development") {
    try {
      const { authorization } = req.headers;
      if (
        authorization === `Bearer ${process.env.API_SECRET_KEY as string}` ||
        process.env.NODE_ENV === "development"
      ) {
        // Get data from your database
        const figures = await scrapeCollection();

        // Upload to MongoDB
        await mongoDropAndImport(figures);

        res.status(200).json({ message: "ok" });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      let message: string = "An unexpected error has occurred";
      if (error instanceof Error) message = error.message;
      res.status(500).json({ message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
