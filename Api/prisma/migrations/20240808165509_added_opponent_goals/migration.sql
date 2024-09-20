/*
  Warnings:

  - Added the required column `scoredByPlayerFirstName` to the `OpponentGoals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoredByPlayerSurname` to the `OpponentGoals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OpponentGoals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "scoredByPlayerFirstName" TEXT NOT NULL,
    "scoredByPlayerSurname" TEXT NOT NULL,
    "time" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "OpponentGoals_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OpponentGoals" ("gameId", "id") SELECT "gameId", "id" FROM "OpponentGoals";
DROP TABLE "OpponentGoals";
ALTER TABLE "new_OpponentGoals" RENAME TO "OpponentGoals";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
