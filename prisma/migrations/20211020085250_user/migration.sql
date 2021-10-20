-- CreateTable
CREATE TABLE "user" (
    "discord_id" TEXT NOT NULL PRIMARY KEY,
    "discord_name" TEXT NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 100
);
