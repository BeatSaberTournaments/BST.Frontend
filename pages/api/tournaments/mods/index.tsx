import type { NextApiRequest, NextApiResponse } from "next";
import information from "../../../../lib/db/server.js";

export default async function getAllusers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(500).json({ message: 'Method not allowed' });
        return;
    }
    const result = await information.query('SELECT modname FROM banned_mods ORDER by ID ASC');
    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No banned mods found' });
        return;
    } else {
        const modnames = result.rows.map((mod) => mod.modname);
        res.status(200).json({ bannedMods: modnames });
    }
};