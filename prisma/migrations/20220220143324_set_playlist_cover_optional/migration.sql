/*
  Warnings:

  - A unique constraint covering the columns `[playlistId]` on the table `PlaylistCover` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlaylistCover_playlistId_key" ON "PlaylistCover"("playlistId");
