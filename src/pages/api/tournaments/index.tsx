import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTournaments } from "@lib/db/tournament";
import { getDevKey } from "@lib/db/users";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: number = parseInt(process.env.TOURNAMENT_RATELIMIT!) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getAllExistingTournaments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");

    const { apikey } = req.headers as unknown as { apikey: string };
    let key: boolean;

    if (apikey == undefined || apikey == null) {
      res.status(400).json({ error: { message: "No API key provided" } });
      return;
    }
    if (apikey.substring(0, 4) === "BSTD") {
      key = await getDevKey(apikey);
    } else {
      res.status(400).json({
        error: {
          message:
            "Invalid API key. If you should have access, contact a developer.",
        },
      });
      return;
    }

    const result = await getAllTournaments();
    if (result == "Not found") {
      res.status(404).json({ error: { message: result } });
      return;
    } else if (result == "Not public") {
      res.status(404).json({ error: { message: result } });
      return;
    } else {
      res.status(200).json({ tournamentInfo: result });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
