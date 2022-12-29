import type { NextApiRequest, NextApiResponse } from "next";
import { getBannedMods } from "@lib/db/tournament";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: number = parseInt(process.env.TOURNAMENT_RATELIMIT!) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getAllBannedMods(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");

    if (req.method !== "GET") {
      res.status(405).json({
        error: { message: "Method not allowed. Make sure you're using GET." },
      });
      return;
    }

    const result = await getBannedMods();
    if (result == "Not found") {
      res.status(404).json({ error: { message: "No banned mods found" } });
      return;
    } else {
      res.status(200).json({ tournamentInfo: result });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
