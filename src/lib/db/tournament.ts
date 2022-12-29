import Information from "./server";
import { Tournament, MapPool } from "@lib/types/tournaments";

export async function getAPIKey(id: number, apikey: string) {
  const result = await Information.query(
    `SELECT id, apikey FROM tournaments WHERE id = ${id}`
  );
  //Return the API key
  if (apikey == result.rows[0].apikey) {
    return true;
  } else {
    return false;
  }
}

//Used on the simple tournament-endpoint.
export async function getSimpleTournament(id: number) {
  const result = await Information.query(
    `SELECT id,tournamentname,state,startdate,enddate,public FROM tournaments WHERE id = ${id}`
  );

  if (result.rows.length === 0) {
    return "Not found";
  } else if (!result.rows[0].public) {
    return "Not public";
  } else {
    const tournamentInfo: Tournament = {
      id: result.rows[0].id,
      tournamentname: result.rows[0].tournamentname,
      state: result.rows[0].state,
      startdate: result.rows[0].startdate,
      enddate: result.rows[0].enddate,
    };
    return tournamentInfo;
  }
}

//Used on the full tournament-endpoint.
export async function getFullTournament(id: number) {
  const result = await Information.query(
    `SELECT * FROM tournaments WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    return "Not found";
  } else if (!result.rows[0].public) {
    return "Not public";
  } else {
    const staff = JSON.parse(result.rows[0].staff);
    const players = JSON.parse(result.rows[0].players);
    const mappools = JSON.parse(result.rows[0].mappools);
    const bracket = JSON.parse(result.rows[0].bracket);

    const tournamentInfo: Tournament = {
      id: result.rows[0].id,
      tournamentname: result.rows[0].tournamentname,
      staff: (result.rows[0].staff = staff),
      players: (result.rows[0].players = players),
      state: result.rows[0].state,
      startdate: result.rows[0].startdate,
      enddate: result.rows[0].enddate,
      mappools: (result.rows[0].mappools = mappools),
      bracket: (result.rows[0].bracket = bracket),
      signupstatus: result.rows[0].signupstatus,
      twitchchannel: result.rows[0].twitchchannel,
      image: result.rows[0].image,
    };
    return tournamentInfo;
  }
}

//Used on the simple tournament-endpoint.
export async function getTournamentMapools(id: number) {
  const result = await Information.query(
    `SELECT id,mappools,public FROM tournaments WHERE id = ${id}`
  );

  if (result.rows.length === 0) {
    return "Not found";
  } else if (!result.rows[0].public) {
    return "Not public";
  } else {
    const mappool = JSON.parse(result.rows[0].mappools);

    const tournamentInfo: Tournament = {
      id: result.rows[0].id,
      mappools: (result.rows[0].mappools = mappool),
    };
    return tournamentInfo;
  }
}

//Used on the simple tournament-endpoint.
export async function getTournamentMapool(id: number, mid: number) {
  const result = await Information.query(
    `SELECT id,mappools,public FROM tournaments WHERE id = ${id}`
  );

  if (result.rows.length === 0) {
    return "Not found";
  } else if (!result.rows[0].public) {
    return "Not public";
  } else {
    const mappool = JSON.parse(result.rows[0].mappools).find(
      (x: { id: number }) => x.id == mid
    );

    const mappoolInfo: MapPool = {
      id: mappool.id,
      round: mappool.round,
      public: mappool.public,
      qualifier: mappool.qualifier,
      image: mappool.image,
      songs: mappool.songs,
    };

    const tournamentInfo: Tournament = {
      id: result.rows[0].id,
      mappool: mappoolInfo,
    };
    return tournamentInfo;
  }
}

//Used to get all tournaments for the index.
export async function getAllTournaments() {
  const result = await Information.query(
    "SELECT id,tournamentname,state,startdate,enddate,signupstatus,public,image FROM tournaments ORDER by ID ASC"
  );
  if (result.rows.length === 0) {
    return "Not found";
  } else if (!result.rows[0].public) {
    return "Not public";
  } else {
    return result.rows;
  }
}

//Used to get all tournaments for the calendar.
export async function getTournamentsCalendar() {
  const result = await Information.query(
    `SELECT id,tournamentname,state,startdate,enddate,signupstatus,public,image FROM tournaments WHERE enddate > NOW() AND state != 3 ORDER by startdate ASC`
  );
  if (result.rows.length === 0) {
    return "Not found";
  } else if (!result.rows[0].public) {
    return "Not public";
  } else {
    return result.rows;
  }
}

export async function getBannedMods() {
  const result = await Information.query(
    "SELECT modname FROM banned_mods ORDER by ID ASC"
  );
  if (result.rows.length === 0) {
    return "Not found";
  } else {
    const modnames = result.rows.map((mod) => mod.modname);
    return modnames;
  }
}
