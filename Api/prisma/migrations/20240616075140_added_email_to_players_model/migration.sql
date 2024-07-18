/*
  Warnings:

  - Added the required column `email` to the `Players` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);
INSERT INTO "new_Players" ("firstName", "id", "surname") SELECT "firstName", "id", "surname" FROM "Players";
DROP TABLE "Players";
ALTER TABLE "new_Players" RENAME TO "Players";
CREATE UNIQUE INDEX "Players_email_key" ON "Players"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
