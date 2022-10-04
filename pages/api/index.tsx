import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from '../../lib/api/ratelimit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
/**
 * @swagger
 * /api/:
 *   get:
 *     description: Allows you to check if the API is online.
 *     responses:
 *       200:
*         description: API is alive!
 *       429:
 *          description: Too many requests.
 */

export default async function getAPIIndex(req: NextApiRequest, res: NextApiResponse) {
  try {
    await limiter.check(res, 5, 'CACHE_TOKEN');
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
    res.status(200).json({ message: `API is alive! Want to learn more? Head over to https://api.${process.env.URL}/` });
  } catch {
    return res.status(429).json({ error: { message: 'Too many requests' } });
  }
};