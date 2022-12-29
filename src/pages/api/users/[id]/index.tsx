import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: number = parseInt(process.env.USER_RATELIMIT!) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getUsersEndpoints(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");

    if (req.method !== "GET") {
      res.status(405).json({
        error: { message: "Method not allowed. Make sure you're using GET" },
      });
      return;
    }
    res.status(200).json({
      error: {
        message: `Please use either /simple or /full after the ID you want to get information from.`,
      },
    });
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
