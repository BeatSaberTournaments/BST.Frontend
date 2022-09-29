import type { NextApiRequest, NextApiResponse } from "next";
import information from "../../../../lib/db/server.js";
import { Tournament } from '../../../../components/interfaces/tournaments.js';

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Method not allowed' });
    return;
  }

  //Query specific user
  const { id } = req.query;
  const result = await information.query(`SELECT * FROM tournaments WHERE id = ${id}`);

  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Tournament not found' });
    return;
  } else if
    (!result.rows[0].public) {
    res.status(404).json({ message: 'Tournament not public' });
    return;
  } else {     
    const staff = JSON.parse(result.rows[0].staff); 
    const players = JSON.parse(result.rows[0].players); 
    const mappools = JSON.parse(result.rows[0].mappools); 
    const bracket = JSON.parse(result.rows[0].bracket);

    const tournamentInfo:Tournament = {
      id: result.rows[0].id,
      tournamentname: result.rows[0].tournamentname,
      staff: result.rows[0].staff = staff,
      players: result.rows[0].players = players,
      state: result.rows[0].state,
      startdate: result.rows[0].startdate,
      enddate: result.rows[0].enddate,
      mappools: result.rows[0].mappools = mappools,
      bracket: result.rows[0].bracket = bracket,
      signupstatus: result.rows[0].signupstatus,
      twitchchannel: result.rows[0].twitchchannel,
      image: result.rows[0].image
    };
    res.status(200).json({ tournamentInfo:tournamentInfo});
   }
};