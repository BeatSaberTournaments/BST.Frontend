import type { NextApiRequest, NextApiResponse } from "next";
import information from "../../../../lib/db/server.js";

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
    const result = await information.query(`SELECT id,tournamentname,state,startdate,enddate,signupstatus,public FROM tournaments WHERE enddate > NOW() AND public = true AND state != 3 ORDER by startdate ASC`);
  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Tournament not found' });
    return;
  } else if
    (!result.rows[0].public) {
    res.status(404).json({ message: 'Tournament not public' });
    return;
  } else { 
    res.status(200).json({ calendar: result.rows });
 }
};