import { Playlist, PrismaClient, Track } from "@prisma/client";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  currentPlaylistState,
  currentTrackState,
  isPlayingState,
} from "../../atoms/atoms";
import ContextMenu from "../../components/ContextMenu";
import { AMAZON_URL } from "../_app";

const prisma = new PrismaClient();

const Playlist = ({ playlists, tracks }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const playlist = playlists.find((playlist: Playlist) => playlist.id === id);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentPlaylist, setCurrentPlaylist] =
    useRecoilState(currentPlaylistState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  useEffect(() => {
    setCurrentPlaylist(playlist);
  }, [id, playlist, setCurrentPlaylist])

  const onPlay = (track: Track | any) => {
    console.log(track);
    setCurrentPlaylist(playlist);
    setCurrentTrack(track);
    // setIsPlaying(true);
  };

  return (
    <div className="flex">
      <div
        className="p-4 w-23rem overflow-y-scroll"
        style={{ height: "calc(100vh - 10rem - 2px)" }}
      >
        <ContextMenu playlists={playlists} tracks={tracks} />
      </div>
      <div
        className="flex flex-1 border-left-2 border-200"
        style={{ backgroundColor: "var(--surface-0)" }}
      >
        <div className="w-full h-full overflow-y-auto">
          <div className="relative h-15rem">
            <div className="container">
              <p
                className="absolute z-2 bottom-0 mb-5 text-5xl font-semibold"
                style={{ color: "white" }}
              >
                {playlist.name}
              </p>
            </div>
            <div
              className="z-1 absolute h-full w-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.6) 140%)",
              }}
            ></div>
            {playlist.covers[0] && (
              <Image
                src={`${AMAZON_URL}/${currentPlaylist?.sampleflipId}/${playlist.covers[0].fileName}`}
                width="100%"
                height="100%"
                layout="fill"
                objectFit="cover"
                alt="cover"
              />
            )}
          </div>
          <div className="container">
            <h1>Info</h1>
            <p>Created at: {format(new Date(playlist.date), "yyyy-MM-dd")}</p>
            <h2>Playlist tracks</h2>
            {tracks.map((track: any) => (
              <div
                key={track.id}
                onClick={(e) => onPlay(track)}
                className="cursor-pointer"
              >
                {track.author.name} {track.fileName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const playlists = await prisma.playlist.findMany({
    include: { covers: true, _count: { select: { tracks: true }, } },
  });

  const tracks = await prisma.track.findMany({
    where: {
      playlistId: context.params!.id as string,
    },
    include: {
      author: true,
    },
  });

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
      tracks: JSON.parse(JSON.stringify(tracks)),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Playlist;
