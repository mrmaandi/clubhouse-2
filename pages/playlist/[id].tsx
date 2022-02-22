import { Playlist, PrismaClient, Track } from "@prisma/client";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
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
  }, [id, playlist, setCurrentPlaylist]);

  const onPlay = (track: Track | any) => {
    console.log(track);
    setCurrentPlaylist(playlist);
    setCurrentTrack(track);
    // setIsPlaying(true);
  };

  return (
    <div className="flex w-full">
      <div className="w-24rem">
        <ContextMenu playlists={playlists} tracks={tracks} />
      </div>

      <div className="flex flex-1">
        <div className="flex flex-1 flex-column">
          <div className="flex align-items-center h-6rem">
            <div className="text-4xl font-bold text-primary uppercase">
              <div>
                <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText defaultValue="" placeholder="Search" />
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="relative">
              <div className="container">
                <p
                  className="absolute z-2 bottom-0 mb-5 text-5xl font-semibold"
                  style={{ color: "white" }}
                >
                  {playlist.name}
                </p>
              </div>
              <div className="h-15rem">
                <div
                  className="z-1 absolute h-full w-full border-round"
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
                    className="border-round"
                  />
                )}
              </div>
            </div>
            <div className="surface-card border-round shadow-3 mt-5 overflow-y-auto">
              <div className="container">
                <h1>Info</h1>
                <p>
                  Created at: {format(new Date(playlist.date), "yyyy-MM-dd")}
                </p>
                <h2>Playlist tracks</h2>
                {tracks.map((track: any) => (
                  <div
                    key={track.id}
                    onClick={(e) => onPlay(track)}
                    className="cursor-pointer"
                  >
                    <span className="font-bold">{track.author.name}</span>{" "}
                    {track.fileName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const playlists = await prisma.playlist.findMany({
    include: { covers: true, _count: { select: { tracks: true } } },
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
