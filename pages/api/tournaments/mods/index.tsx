import type { NextApiRequest, NextApiResponse } from "next";
import Information from "../../../../lib/db/server";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(500).json({ error:{ message: 'Method not allowed. Make sure you\'re using GET.' }});
        return;
    }
    const result = await Information.query('SELECT modname FROM banned_mods ORDER by ID ASC');
    if (result.rows.length === 0) {
        res.status(404).json({error:{ message: 'No banned mods found.' }});
        return;
    } else {
        const modnames = result.rows.map((mod) => mod.modname);
        res.status(200).json({ bannedMods: modnames });
    }
};