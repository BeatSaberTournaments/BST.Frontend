import type { NextApiRequest, NextApiResponse } from "next";
import Information from "../../../../lib/db/server";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(500).json({ error:{ message: 'Method not allowed. Make sure you\'re using GET.' }});
        return;
    }

    //Query specific user
    const { id } = req.query;
    const result = await Information.query(`SELECT * FROM users WHERE scoresaberid = ${id}`);

    //Check if result is empty, else return user
    if (result.rows.length === 0) {
        res.status(404).json({error:{ message: 'User not found' }});
        return;
    } else { res.status(200).json({ userinfo: result.rows }); }
};