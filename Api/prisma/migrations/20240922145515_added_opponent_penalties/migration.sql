-- CreateTable
CREATE TABLE "OpponentPenalties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" TEXT NOT NULL,
    "playerFirstName" TEXT NOT NULL,
    "playerSurname" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "time" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "OpponentPenalties_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
