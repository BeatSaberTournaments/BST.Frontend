import type { NextApiRequest, NextApiResponse } from "next";
import { getFullUser } from "@lib/db/users";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: number = parseInt(process.env.USER_RATELIMIT!) || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getFullUserdata(
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

    //Set {id} to be a number

    const { id } = req.query as unknown as { id: any };

    //If ID is not a bigint, return error - Argument of type 'bigint' is not assignable to parameter of type 'number', but works??
    if (isNaN(id)) {
      console.log(id);
      res.status(400).json({ error: { message: "ID should be a number" } });
      return;
    }

    const result = await getFullUser(id);

    //Check if result is empty, else return user
    if (result == "User not found") {
      res.status(404).json({ error: { message: result } });
      return;
    } else {
      res.status(200).json({ userInfo: result });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
