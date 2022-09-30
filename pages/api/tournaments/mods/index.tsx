import type { NextApiRequest, NextApiResponse } from "next";
import { getBannedMods } from '../../../../components/db/tournament';

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET.' } });
        return;
    }

    const result = await getBannedMods();
    if (result == "Not found") {
        res.status(404).json({ error: { message: 'No banned mods found' } });
        return;
    } else { res.status(200).json({ tournamentInfo: result }); }
};