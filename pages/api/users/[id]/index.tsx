import type { NextApiRequest, NextApiResponse } from "next";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
    return;
  }
  res.status(200).json({ error: { message: `Please use either /simple or /full after the ID you want to get information from.` } });
};