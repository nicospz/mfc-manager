import { Figures, scrapeCollection } from '@/helpers/scraper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { s3 } from '@/helpers/s3';

export interface FigureType {
  id: string
  title: string
  releaseDate: string
  shop: string
  price: number
  paymentDate: string
  status: string
}

export interface FigureCollectionType {
  figures: Figures
  updatedAt: Date
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<FigureCollectionType | { message: string }>
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY as string}`) {
        // Get data from your database
        const figures = await scrapeCollection();
        const json = {
          figures,
          updatedAt: new Date()
        };

        const bucketParams = {
          Bucket: process.env.R2_BUCKET_NAME as string,
          Key: 'mfc_collection.json',
          Body: JSON.stringify(json)
        };

        // Upload the new object to the bucket.
        console.log('Uploading object to R2...');
        try {
          await s3
            .putObject({
              Bucket: process.env.R2_BUCKET_NAME as string,
              Key: 'mfc_collection.json',
              Body: JSON.stringify(json)
            })
            .promise();
          console.log(
      `Successfully uploaded object: ${bucketParams.Bucket}/${bucketParams.Key}`
          );
        } catch (err) {
          console.log('Error', err);
        }

        res.status(200).json(json);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      let message: string = 'An unexpected error has occurred';
      if (error instanceof Error) message = error.message;
      res.status(500).json({ message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
