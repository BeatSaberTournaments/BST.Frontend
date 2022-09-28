import type { NextApiRequest, NextApiResponse } from "next";
import information from "../../../lib/db/server.js";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(500).json({ message: 'Method not allowed' });
        return;
    }
    //Select all tournament ordered by ascending id where public is true
    const result = await information.query('SELECT id,tournamentname,state,startdate,enddate,signupstatus,twitchchannel,image FROM tournaments WHERE public = true ORDER by ID ASC');
    //Check if result is empty, else return user
    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No public tournaments' });
        return;
    } else { res.status(200).json({ tournamentInfo: result.rows }); }
};