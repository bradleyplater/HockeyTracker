-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- Insert season for 2023-2024
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN110', '2023-2024', '2023-10-01T00:00:00.000Z', '2024-09-30T23:59:59.000Z');

-- Insert season for 2024-2025
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN120', '2024-2025', '2024-10-01T00:00:00.000Z', '2025-09-30T23:59:59.000Z');

-- Insert season for 2025-2026
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN130', '2025-2026', '2025-10-01T00:00:00.000Z', '2026-09-30T23:59:59.000Z');

-- Insert season for 2026-2027
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN140', '2026-2027', '2026-10-01T00:00:00.000Z', '2027-09-30T23:59:59.000Z');

-- Insert season for 2027-2028
INSERT INTO "Season" (id, name, "startDate", "endDate")
VALUES ('SSN150', '2027-2028', '2027-10-01T00:00:00.000Z', '2028-09-30T23:59:59.000Z');
