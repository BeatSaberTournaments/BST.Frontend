import type { NextApiRequest, NextApiResponse } from "next";
import Information from "../../../../lib/db/server";

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ error:{ message: 'Method not allowed. Make sure you\'re using GET' }});
    return;
  }

  const { id } = req.query;
    const result = await Information.query(`SELECT id,tournamentname,state,startdate,enddate,signupstatus,public FROM tournaments WHERE enddate > NOW() AND public = true AND state != 3 ORDER by startdate ASC`);
  if (result.rows.length === 0) {
    res.status(404).json({error:{ message: 'No tournaments found in calendar.' }});
    return;
  } else { 
    res.status(200).json({ calendar: result.rows });
 }
};