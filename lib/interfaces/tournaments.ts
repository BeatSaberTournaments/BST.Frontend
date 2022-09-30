export interface Tournament {
  id: number;
  tournamentname: string;
  staff?: string;
  players?: string;
  state?: number;
  startdate?: Date;
  enddate?: Date;
  mappools?: string;
  bracket?: string;
  signupstatus?: number;
  twitchchannel?: string;
  public?: boolean;
  image?: string;
}