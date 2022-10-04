import type { NextApiRequest, NextApiResponse } from "next";
import { getDevKey, getAllUsers } from '../../../lib/db/users';
import rateLimit from '../../../lib/api/ratelimit';

const ratelimit:number = parseInt(process.env.USER_RATELIMIT) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
/**
 * @swagger
 * /api/users/:
 *   get:
 *     description: Returns the userlist - only for admins
 *     responses:
 *        200:
 *         description: Gives detailed information about the upcoming tournaments
 *        404:
 *         description: No users in database.
 *       429:
 *          description: Too many requests.
 */

export default async function getExistingUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
        await limiter.check(res, ratelimit, 'CACHE_TOKEN');
        const { apikey } = (req.headers || req.query) as unknown as { apikey: string };
        let key: boolean;

        if (apikey == undefined || apikey == null) {
            res.status(400).json({ error: { message: 'No API key provided' } });
            return;
        }

        if (apikey.substring(0, 4) === "BSTD") {
            key = await getDevKey(apikey);
        } else {
            res.status(400).json({ error: { message: 'Invalid API key. If you should have access, contact a developer.' } });
            return;
        }

        if (req.method !== 'GET') {
            res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
            return;
        }
        if (key) {
            const result = await getAllUsers();
            if (result == "No users found") {
                res.status(404).json({ error: { message: result } });
            } else { res.status(200).json({ userInfo: result }); }
        } else {
            res.status(401).json({ error: { message: 'Invalid API key. If you should have access, contact a developer.' } });
            return;
        }
    } catch {
        return res.status(429).json({ error: { message: 'Too many requests' } });
    }
};