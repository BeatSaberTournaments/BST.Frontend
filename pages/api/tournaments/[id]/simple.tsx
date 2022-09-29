import type { NextApiRequest, NextApiResponse } from "next";
import information from "../../../../lib/db/server.js";
import { Tournament } from '../../../../components/interfaces/tournaments.js';

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  const result = await information.query(`SELECT id,tournamentname,state,startdate,enddate,public FROM tournaments WHERE id = ${id}`);

  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Tournament not found' });
    return;
  } else if
    (!result.rows[0].public) {
    res.status(404).json({ message: 'Tournament not public' });
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