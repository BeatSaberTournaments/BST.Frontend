import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db/server.js";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Method not allowed' });
    return;
  }

  const data = await pool.query('SELECT * FROM users ORDER by ID ASC');
  //Check if result is empty, else return user
  if (data.rows.length === 0) {
    res.status(404).json({ message: 'No users in database' });
    return;
  } else { res.status(200).json({ users: data.rows }); }
};