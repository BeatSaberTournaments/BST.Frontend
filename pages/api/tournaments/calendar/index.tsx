import type { NextApiRequest, NextApiResponse } from "next";
import { getTournamentsCalendar } from '../../../../lib/db/tournament';

export default async function getTournamentCalendar(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
    return;
  }

  const result = await getTournamentsCalendar();

  //Check if result is empty, else return user
  if (result == "Not found") {
    res.status(404).json({ error: { message: 'Tournament not found' } });
    return;
  } else if (result == "Not public") {
    res.status(404).json({ error: { message: 'Tournament not public' } });
    return;
  } else { res.status(200).json({ tournamentInfo: result }); }
};