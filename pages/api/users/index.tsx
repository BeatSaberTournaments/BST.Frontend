import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers } from '../../../components/db/users';

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
        return;
    }
    const result = await getAllUsers();

    //Check if result is empty, else return user
    if (result == "No users found") {
        res.status(404).json({ error: { message: result } });
        return;
    } else { res.status(200).json({ userInfo: result }); }
};