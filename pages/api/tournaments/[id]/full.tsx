import type { NextApiRequest, NextApiResponse } from "next";
import { getAPIKey, getFullTournament } from '../../../../lib/db/tournament';
import { getDevKey } from '../../../../lib/db/users';
import rateLimit from '../../../../lib/api/ratelimit';

const ratelimit: number = parseInt(process.env.TOURNAMENT_RATELIMIT) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

/**
 * @swagger
 * /api/tournaments/{id}/full:
 *   get:
 *     description: Returns the full tournament information - Reserved for Tournament organizers and website developers
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the tournament
 *        required: true
 *     responses:
 *       200:
 *         description: Gives full information about the tournament. Useful for creating your own tournament page.
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

    const { id } = req.query as unknown as { id: number };
    const { apikey } = req.headers as unknown as { apikey: string };
    let key: boolean;

    if (apikey == undefined || apikey.length == 0) {
      res.status(400).json({ error: { message: 'No API key provided' } });
      return;
      //Check if first 4 letters are BSTD
    }
    if (apikey.substring(0, 4) === "BSTT") {
      key = await getAPIKey(id, apikey);
      console.log(key);
    } else if (apikey.substring(0, 4) === "BSTD") {
      key = await getDevKey(apikey);
      console.log(key);
    }

    if (req.method == 'GET' && key) {
      const result = await getFullTournament(id);
      if (result == "Not found") {
        res.status(404).json({ error: { message: "Tournament doesn't exist." } });
        return;
      }
      if (result == "Not public") {
        res.status(404).json({ error: { message: "This tournament is yet to be public" } });
        return;
      }
      if (result) {
        res.status(200).json({ tournamentInfo: result });
      }
    } else {
      res.status(400).json({ error: { message: 'Invalid API key' } });
    }

    if (req.method == 'POST' && (!isNaN(id) || key == true)) {
      res.status(501).json({ error: { message: 'API Key valid. POST API will be finished soon.' } });
    }
  } catch {
    return res.status(429).json({ error: { message: 'Too many requests' } });
  }
};