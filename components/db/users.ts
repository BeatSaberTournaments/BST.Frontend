import Information from "../../lib/db/server";
import { User } from '../../components/interfaces/users';

//Used on the simple tournament-endpoint.
export async function getSimpleUser(scoresaberid: bigint) {
    const result = await Information.query(`SELECT * FROM users WHERE scoresaberid = ${scoresaberid}`);
    if (result.rows.length === 0) {
        return "User not found";
    } else {
        const userInfo: User = {
            id: result.rows[0].id,
            username: result.rows[0].username,
            scoresaberid: result.rows[0].scoresaberid,
            twitch: result.rows[0].twitch,
            discord: result.rows[0].discord
        };
        return userInfo;
    }
}

//Used on the full user-endpoint.
export async function getFullUser(scoresaberid: bigint) {
    const result = await Information.query(`SELECT * FROM users WHERE scoresaberid = ${scoresaberid}`);
    if (result.rows.length === 0) {
        return "User not found";
    } else {
        const userInfo: User = {
            id: result.rows[0].id,
            username: result.rows[0].username,
            permissions: result.rows[0].permissions,
            creationdate: result.rows[0].creationdate,
            scoresaberid: result.rows[0].scoresaberid,
            twitch: result.rows[0].twitch,
            discord: result.rows[0].discord,
            image: result.rows[0].image
        };
        return userInfo;
    }
}

//Used to get all users for the index.
export async function getAllUsers() {
    const result = await Information.query(`SELECT id, username, scoresaberid FROM users ORDER by ID ASC`);
    if (result.rows.length === 0) {
        return "No users found";
    } else {
        return result.rows;
    }
}