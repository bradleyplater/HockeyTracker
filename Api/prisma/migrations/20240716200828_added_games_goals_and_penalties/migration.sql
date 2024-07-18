-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamCreatedById" TEXT NOT NULL,
    "opponentTeam" TEXT NOT NULL,
    "isHome" BOOLEAN NOT NULL,
    "goalsConceeded" INTEGER NOT NULL,
    "goalsScored" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'challenge',
    CONSTRAINT "Games_teamCreatedById_fkey" FOREIGN KEY ("teamCreatedById") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "scoredByPlayerId" TEXT NOT NULL,
    "assist1" TEXT,
    "assist2" TEXT,
    "time" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Goals_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Penalties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "time" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Penalties_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GamesToPlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GamesToPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Games" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamesToPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToPlayers_AB_unique" ON "_GamesToPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToPlayers_B_index" ON "_GamesToPlayers"("B");
