import type { NextApiRequest, NextApiResponse } from "next";
import { getSimpleUser } from '../../../../lib/db/users';
import rateLimit from '../../../../lib/api/ratelimit';

const ratelimit:number = parseInt(process.env.USER_RATELIMIT) || 10;
const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
  })

/**
 * @swagger
 * /api/users/{id}/simple:
 *   get:
 *     description: Returns the users simple information.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Gives simple information about the user. Useful for match-handling in a tournament webpanel.
 *       404: 
 *          description: No user found.
 *       429:
 *          description: Too many requests.
 */

export default async function getSimpleUserdata(req: NextApiRequest, res: NextApiResponse) {

    try {
        await limiter.check(res, ratelimit, 'CACHE_TOKEN');
        
        if (req.method !== 'GET') {
            res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
            return;
        }

        const { id } = req.query as unknown as { id: number };

        //If ID is not a bigint, return error - Argument of type 'bigint' is not assignable to parameter of type 'number', but works??
        if (isNaN(id)) {
            res.status(400).json({ error: { message: 'ID should be a number' } });
            return;
        }

        const result = await getSimpleUser(id);

        //Check if result is empty, else return user
        if (result == "User not found") {
            res.status(404).json({ error: { message: result } });
            return;
        } else { res.status(200).json({ userInfo: result }); }
    } catch {
      return res.status(429).json({ error: { message: 'Too many requests' } });
    }
};