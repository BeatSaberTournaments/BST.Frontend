import type { NextApiRequest, NextApiResponse } from "next";
import Information from "../../../lib/db/server";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ error:{ message: 'Method not allowed. Make sure you\'re using GET.' }});
    return;
  }

  const data = await Information.query('SELECT * FROM users ORDER by ID ASC');
  //Check if result is empty, else return user
  if (data.rows.length === 0) {
    res.status(404).json({error:{ message: 'No users in database' }});
    return;
  } else { res.status(200).json({ users: data.rows }); }
};