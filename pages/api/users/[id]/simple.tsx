import type { NextApiRequest, NextApiResponse } from "next";
import { getSimpleUser } from '../../../../components/db/users';

export default async function getTournament(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(405).json({ error: { message: 'Method not allowed. Make sure you\'re using GET' } });
        return;
    }

    //Set {id} to be a number 

    const { id } = req.query as unknown as { id: bigint };

    //If ID is not a bigint, return error - Argument of type 'bigint' is not assignable to parameter of type 'number', but works??
    if (isNaN(id)) {
        res.status(400).json({ error: { message: 'ID should be a number' } });
        return;
    }

    const result = await getSimpleUser(id);

    //Check if result is empty, else return user
    if (result == "User not found") {
        res.status(404).json({ error: { message: result } });
        return;
    } else { res.status(200).json({ userInfo: result }); }
};