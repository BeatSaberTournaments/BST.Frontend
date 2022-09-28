import type { NextApiRequest, NextApiResponse } from "next";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Method not allowed' });
    return;
  }

  res.status(200).json({ message: `API is alive! Want to learn more? Head over to https://api.${process.env.URL}/` });
};