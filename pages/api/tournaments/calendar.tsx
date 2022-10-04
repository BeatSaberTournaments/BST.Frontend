import type { NextApiRequest, NextApiResponse } from "next";
import { getTournamentsCalendar } from '../../../lib/db/tournament';
import rateLimit from '../../../lib/api/ratelimit';

const ratelimit: number = parseInt(process.env.TOURNAMENT_RATELIMIT) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
/**
 * @swagger
 * /api/tournaments/calendar:
 *   get:
 *     description: Returns a list of public tournaments - Developers API key required
 *     responses:
 *        200:
 *         description: Gives detailed information about the upcoming tournaments
 *        404:
 *          description: No tournaments planned.
 *        429:
 *          description: Too many requests.
 */

export default async function getTournamentCalendar(req: NextApiRequest, res: NextApiResponse) {
  try {
    await limiter.check(res, ratelimit, 'CACHE_TOKEN');
    if (req.method !== 'GET') {
      res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
      return;
    }

    const result = await getTournamentsCalendar();

    //Check if result is empty, else return user
    if (result == "Not found") {
      res.status(404).json({ error: { message: 'Tournament not found' } });
      return;
    } else if (result == "Not public") {
      res.status(404).json({ error: { message: 'Tournament not public' } });
      return;
    } else { res.status(200).json({ tournamentInfo: result }); }
  } catch {
    return res.status(429).json({ error: { message: 'Too many requests' } });
  }
};