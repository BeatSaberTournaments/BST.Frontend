import type { NextApiRequest, NextApiResponse } from "next";
import { getSimpleTournament } from '../../../../lib/db/tournament';
import rateLimit from '../../../../lib/api/ratelimit';

const ratelimit: number = parseInt(process.env.TOURNAMENT_RATELIMIT) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
/**
 * @swagger
 * /api/tournaments/{id}/simple:
 *   get:
 *     description: Returns the simple tournament information
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Gives simple information about the tournament.
 *       400:
 *         description: Invalid API key/No API key provided
 *       404: 
 *          description: No tournament found.
 *       429:
 *          description: Too many requests.
 */

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {
  try {
    await limiter.check(res, ratelimit, 'CACHE_TOKEN');
    if (req.method !== 'GET') {
      res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
      return;
    }

    //Set {id} to be a number 

    const { id } = req.query as unknown as { id: number };
    //Check if {id} is a number
    if (isNaN(id)) {
      res.status(400).json({ error: { message: 'ID should be a number' } });
      return;
    }
    const result = await getSimpleTournament(id);

    //Check if result is empty, else return user
    if (result == "Not found") {
      res.status(404).json({ error: { message: result } });
      return;
    } else if (result == "Not public") {
      res.status(404).json({ error: { message: result } });
      return;
    } else { res.status(200).json({ tournamentInfo: result }); }
  } catch {
    return res.status(429).json({ error: { message: 'Too many requests' } });
  }
};