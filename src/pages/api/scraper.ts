import { Figures, scrapeCollection } from "@/helpers/scraper";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { s3 } from "@/helpers/s3";
import parse from "date-fns/parse";

export type FigureType = {
  id: string;
  title: string;
  releaseDate: string;
  shop: string;
  price: number;
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
  const json = {
    figures: figures
      .map((figure) => _.mapKeys(figure, (v, k) => _.camelCase(k)))
      .map((figure) => ({
        ...figure,
        // Replace 00 from date string with 28 to avoid parsing errors
        releaseDate: figure.releaseDate
          .replace(/(\d{4})-(\d{2})-00/, "$1-$2-28")
          .sort(function (a, b) {
            const dateA = parse(a.releaseDate, "yyyy-MM-dd", new Date());
            const dateB = parse(b.releaseDate, "yyyy-MM-dd", new Date());
            console.log(dateA, dateB);
            return dateA.getTime() - dateB.getTime();
          }),
        price: parseInt(figure.price),
      })) as FigureType[],
    updatedAt: new Date(),
  };

  const bucketParams = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: "mfc_collection.json",
    Body: JSON.stringify(json),
  };

  // Upload the new object to the bucket.
  console.log("Uploading object to R2...");
  try {
    const data = await s3
      .putObject({
        Bucket: process.env.R2_BUCKET_NAME as string,
        Key: "mfc_collection.json",
        Body: JSON.stringify(json),
      })
      .promise();
    console.log(
      "Successfully uploaded object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
    );
  } catch (err) {
    console.log("Error", err);
  }

  res.status(200).json(json);
}
