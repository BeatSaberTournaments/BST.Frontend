import type { NextApiRequest, NextApiResponse } from "next";
import { getSimpleTournament } from '../../../../components/db/tournament';

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
    return;
  }

  //Set {id} to be a number 

  const { id } = req.query as unknown as { id: number };
  //Check if {id} is a number
  if (isNaN(id)) {
    res.status(400).json({ error: { message: 'ID should be a number' } });
    return;
  }
  const result = await getSimpleTournament(id);

  //Check if result is empty, else return user
  if (result == "Not found") {
    res.status(404).json({ error: { message: result } });
    return;
  } else if (result == "Not public") {
    res.status(404).json({ error: { message: result } });
    return;
  } else { res.status(200).json({ tournamentInfo: result }); }
};