export interface Player {
  name: string;
  score: number;
  time: number;
  deaths: number;
  team: string;
  is_bot: boolean;
}

export interface TeamInfo {
  count: number;
  players: Player[];
}

export interface ServerData {
  status: string;
  name: string;
  map: string;
  players_online: number;
  max_players: number;
  ping: number;
  connect: string;
  password: boolean;
  teams: {
    ct: TeamInfo;
    terrorist: TeamInfo;
    spectators: TeamInfo;
  };
  players: Player[];
  bots: Player[];
  updated_at: string;
  updated_at_iso: string;
}

export interface SearchResult {
  is_online: boolean;
  matches: Player[];
}