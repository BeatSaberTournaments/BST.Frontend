import type { NextApiRequest, NextApiResponse } from "next";
import Information from "../../../../lib/db/server";
import { Tournament } from '../../../../components/interfaces/tournaments';

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ error:{ message: 'Method not allowed. Make sure you\'re using GET' }});
    return;
  }

  const { id } = req.query;
  const result = await Information.query(`SELECT id,tournamentname,state,startdate,enddate,public FROM tournaments WHERE id = ${id}`);

  if (result.rows.length === 0) {
    res.status(404).json({ error:{ message: 'Tournament not found' }});
    return;
  } else if
    (!result.rows[0].public) {
    res.status(404).json({ error:{ message: 'Tournament not public' }});
    return;
  } else { 
    
    const tournamentInfo:Tournament = {
      id: result.rows[0].id,
      tournamentname: result.rows[0].tournamentname,
      state: result.rows[0].state,
      startdate: result.rows[0].startdate,
      enddate: result.rows[0].enddate
    };

    res.status(200).json({ tournamentInfo: tournamentInfo });
  
  }
};