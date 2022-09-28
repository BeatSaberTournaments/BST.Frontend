import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../../lib/db/server.js";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(500).json({ message: 'Method not allowed' });
        return;
    }

    //Query specific user
    const { id } = req.query;
    const result = await pool.query(`SELECT username,scoresaberid,twitch FROM users WHERE scoresaberid = ${id}`);

    //Check if result is empty, else return user
    if (result.rows.length === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
    } else { res.status(200).json({ userinfo: result.rows }); }
};