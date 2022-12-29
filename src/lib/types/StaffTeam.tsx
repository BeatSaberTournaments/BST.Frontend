export interface StaffTeam {
  [x: string]: any;
  Members: StaffMembers;
}

export interface StaffMembers {
  Developers: Member[];
  Admins: Member[];
  TournamentModerators: Member[];
  Streamer: Member[];
  ContentCreators: Member[];
}

export interface Member {
  Name: string;
  Roles: [];
  ScoreSaberID: string;
  Discord?: string;
  Twitter?: string;
}
