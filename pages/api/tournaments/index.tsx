import type { NextApiRequest, NextApiResponse } from "next";
import Information from "../../../lib/db/server";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(500).json({ error:{ message: 'Method not allowed. Make sure you\'re using GET.' }});
        return;
    }
    const result = await Information.query('SELECT id,tournamentname,state,startdate,enddate,signupstatus,image FROM tournaments WHERE public = true ORDER by ID ASC');
    if (result.rows.length === 0) {
        res.status(404).json({error:{ message: 'No public tournaments' }});
        return;
    } else { res.status(200).json({ tournamentInfo: result.rows }); }
};