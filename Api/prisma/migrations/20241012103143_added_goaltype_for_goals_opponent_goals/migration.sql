-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "scoredByPlayerId" TEXT NOT NULL,
    "assist1" TEXT,
    "assist2" TEXT,
    "type" TEXT NOT NULL DEFAULT 'even',
    "time" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Goals_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Goals" ("assist1", "assist2", "gameId", "id", "scoredByPlayerId", "time") SELECT "assist1", "assist2", "gameId", "id", "scoredByPlayerId", "time" FROM "Goals";
DROP TABLE "Goals";
ALTER TABLE "new_Goals" RENAME TO "Goals";
CREATE TABLE "new_OpponentGoals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "scoredByPlayerFirstName" TEXT NOT NULL,
    "scoredByPlayerSurname" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'even',
    "time" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "OpponentGoals_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OpponentGoals" ("gameId", "id", "scoredByPlayerFirstName", "scoredByPlayerSurname", "time") SELECT "gameId", "id", "scoredByPlayerFirstName", "scoredByPlayerSurname", "time" FROM "OpponentGoals";
DROP TABLE "OpponentGoals";
ALTER TABLE "new_OpponentGoals" RENAME TO "OpponentGoals";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
