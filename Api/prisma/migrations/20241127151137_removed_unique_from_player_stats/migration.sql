-- DropIndex
DROP INDEX "PlayersInTeams_playerNumber_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamCreatedById" TEXT NOT NULL,
    "opponentTeam" TEXT NOT NULL,
    "isHome" BOOLEAN NOT NULL,
    "goalsConceeded" INTEGER NOT NULL,
    "goalsScored" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'challenge',
    "seasonId" TEXT NOT NULL DEFAULT 'SSN120',
    CONSTRAINT "Games_teamCreatedById_fkey" FOREIGN KEY ("teamCreatedById") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Games" ("date", "goalsConceeded", "goalsScored", "id", "isHome", "opponentTeam", "teamCreatedById", "type") SELECT "date", "goalsConceeded", "goalsScored", "id", "isHome", "opponentTeam", "teamCreatedById", "type" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
