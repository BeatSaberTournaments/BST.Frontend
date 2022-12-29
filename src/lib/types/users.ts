export interface User {
  id: number;
  username: string;
  permissions?: number;
  creationdate?: Date;
  scoresaberid: bigint;
  twitch?: string;
  discord?: string;
  image?: string;
}
