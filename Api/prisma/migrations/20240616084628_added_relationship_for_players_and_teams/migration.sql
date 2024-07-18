-- CreateTable
CREATE TABLE "PlayersInTeams" (
    "playerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerNumber" INTEGER,
    CONSTRAINT "PlayersInTeams_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayersInTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayersInTeams_playerId_key" ON "PlayersInTeams"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayersInTeams_playerNumber_key" ON "PlayersInTeams"("playerNumber");
