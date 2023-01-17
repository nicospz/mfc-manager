import { s3 } from "@/helpers/s3";
import { FigureCollectionType } from "@/pages/api/scraper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FigureCollectionType>
) {
  const response = await s3
    .getObject({
      Bucket: process.env.R2_BUCKET_NAME as string,
      Key: "mfc_collection.json",
    })
    .promise();

  const body = JSON.parse(
    response.Body?.toString("utf-8") || "{}"
  ) as FigureCollectionType;
  console.log(body);
  const data = {
    updatedAt: body.updatedAt,
    figures: body.figures.filter((figure) => figure.status === "Ordered"),
  };

  res.status(200).json(data);
}
