export interface PostGameModel {
    teamCreatedById: string;
    opponentTeamName: string;
    isHome: boolean;
    players: { id: string }[];
    date: Date;
    type: 'challenge' | 'cup';
}
