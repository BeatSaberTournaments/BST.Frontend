import type { NextApiRequest, NextApiResponse } from "next";
import information from "../../../lib/db/server.js";
import { Tournament } from '../../../components/interfaces/tournaments.js';

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(500).json({ message: 'Method not allowed' });
        return;
    }
    const result = await information.query('SELECT id,tournamentname,state,startdate,enddate,signupstatus,image FROM tournaments WHERE public = true ORDER by ID ASC');
    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No public tournaments' });
        return;
    } else { res.status(200).json({ tournamentInfo: result.rows }); }
};