-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "numberOfGoals" INTEGER DEFAULT 0,
    "numberOfAssists" INTEGER DEFAULT 0,
    "gamesPlayed" INTEGER DEFAULT 0,
    "pims" INTEGER DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "teamId" TEXT,
    CONSTRAINT "PlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerStats_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerStats_playerId_teamId_fkey" FOREIGN KEY ("playerId", "teamId") REFERENCES "PlayersInTeams" ("playerId", "teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayersInTeams" (
    "playerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerNumber" INTEGER,

    PRIMARY KEY ("playerId", "teamId"),
    CONSTRAINT "PlayersInTeams_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayersInTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlayersInTeams" ("playerId", "playerNumber", "teamId") SELECT "playerId", "playerNumber", "teamId" FROM "PlayersInTeams";
DROP TABLE "PlayersInTeams";
ALTER TABLE "new_PlayersInTeams" RENAME TO "PlayersInTeams";
CREATE UNIQUE INDEX "PlayersInTeams_playerId_key" ON "PlayersInTeams"("playerId");
CREATE UNIQUE INDEX "PlayersInTeams_playerNumber_key" ON "PlayersInTeams"("playerNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
