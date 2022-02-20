-- DropIndex
DROP INDEX "PlaylistCover_playlistId_key";

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "sampleflipId" TEXT;
