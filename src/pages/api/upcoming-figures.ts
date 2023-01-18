import { NextApiRequest, NextApiResponse } from 'next';
import { s3 } from '@/helpers/s3';
import { FigureCollectionType } from '@/pages/api/scraper';

export default async function handler (
  _req: NextApiRequest,
  res: NextApiResponse<FigureCollectionType | { message: string }>
) {
  const start = new Date();
  try {
    const response = await s3
      .getObject({
        Bucket: process.env.R2_BUCKET_NAME as string,
        Key: 'mfc_collection.json'
      })
      .promise();

    const body = JSON.parse(
      response.Body?.toString('utf-8') ?? '{}'
    ) as FigureCollectionType;
    const data = {
      updatedAt: body.updatedAt,
      figures: body.figures.filter((figure) => figure.status === 'Ordered')
    };
    console.log(
      `Upcoming figures fetched in ${new Date().getTime() - start.getTime()}ms`
    );
    res.status(200).json(data);
  } catch {
    res.status(404).json({ message: 'File not found' });
  }
}