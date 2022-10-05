export interface Tournament {
  id: number;
  tournamentname?: string;
  staff?: string;
  players?: string;
  state?: number;
  startdate?: Date;
  enddate?: Date;
  mappools?: MapPool | MapPool[];
  mappool?: MapPool | MapPool[];
  bracket?: string;
  signupstatus?: number;
  twitchchannel?: string;
  public?: boolean;
  image?: string;
  apikey?: string | string[];
}

//The Interface/Array structure for the mappools-column in the database.
export interface MapPool {
  id: number | number[];
  round: number | number[];
  public: boolean | boolean[];
  qualifier: boolean | boolean[];
  image: string | string[];
  songs: Song[] | Song[][];
}

//The interface/array structure for the song-array from the mappools-array in the database.
export interface Song {
  name: string;
  bsr: number;
  diff: number;
}

export interface Mods {
  name: string;
}