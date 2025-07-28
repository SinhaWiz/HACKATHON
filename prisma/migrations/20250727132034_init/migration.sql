-- CreateTable
CREATE TABLE "Society" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "members" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "societyId" TEXT NOT NULL,
    CONSTRAINT "Event_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Registration_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
