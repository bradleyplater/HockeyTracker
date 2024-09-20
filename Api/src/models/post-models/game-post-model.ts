export interface PostGameModel {
    teamCreatedById: string;
    opponentTeam: string;
    isHome: boolean;
    players: { id: string }[];
    date: Date;
    type: 'challenge' | 'cup';
}
