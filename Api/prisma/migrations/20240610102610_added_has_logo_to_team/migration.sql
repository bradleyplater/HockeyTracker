-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hasLogo" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Teams" ("id", "name") SELECT "id", "name" FROM "Teams";
DROP TABLE "Teams";
ALTER TABLE "new_Teams" RENAME TO "Teams";
CREATE UNIQUE INDEX "Teams_name_key" ON "Teams"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
