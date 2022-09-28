import type { NextApiRequest, NextApiResponse } from "next";
import information from "../../../../lib/db/server.js";

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Method not allowed' });
    return;
  }

  //Query specific user
  const { id } = req.query;
  const result = await information.query(`SELECT * FROM tournaments WHERE id = ${id}`);

  //Check if result is empty, else return user
  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Tournament not found' });
    return;
  } else if
    (!result.rows[0].public) {
    res.status(404).json({ message: 'Tournament not public' });
    return;
  } else { res.status(200).json({ tournamentinfo: result.rows }); }
};