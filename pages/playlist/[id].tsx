import { PauseIcon, PlayIcon } from "@heroicons/react/solid";
import { Playlist, PrismaClient, Track } from "@prisma/client";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import {
  playerActiveState,
  playerPlayingState,
  playerPlaylistState,
  playerTrackIndexState,
  playerTracksState,
} from "../../atoms/atoms";
import ContextMenu from "../../components/ContextMenu";
import { AMAZON_URL } from "../_app";

const prisma = new PrismaClient();

const Playlist = ({ playlists, playlist, tracks }: any) => {
  const [trackIndex, setTrackIndex] = useRecoilState(playerTrackIndexState);
  const [isPlaying, setIsPlaying] = useRecoilState(playerPlayingState);
  const [isActive, setIsActive] = useRecoilState(playerActiveState);
  const [playerPlaylist, setPlayerPlaylist] =
    useRecoilState(playerPlaylistState);
  const [playerTracks, setPlayerTracks] = useRecoilState(playerTracksState);

  const playPauseTrack = (cardTrack: Track | any) => {
    const cardTrackIndex = tracks.indexOf(
      tracks.find((track: Track) => track.id === cardTrack.id)
    );

    if (!isActive) {
      setIsActive(true);
    }

    if (playerPlaylist?.id !== playlist.id) {
      setPlayerPlaylist(playlist);
      setPlayerTracks(tracks);
    }

    if (cardTrack.id === playerTracks[trackIndex]?.id) {
      setIsPlaying(!isPlaying);
    } else {
      setTrackIndex(tracks.indexOf(cardTrack));
      setIsPlaying(true);
    }

    setTrackIndex(cardTrackIndex);
  };

  const TrackCard = ({ cardTrack }: any) => {
    return (
      <div className="py-2 px-3 shadow-1 border-round surface-50">
        <div className="flex align-items-center" style={{ gap: 20 }}>
          <div className="flex align-items-center">
            {cardTrack.id === tracks[trackIndex].id &&
            playlist.id === playerPlaylist?.id &&
            isPlaying ? (
              <PauseIcon
                height="3rem"
                onClick={() => playPauseTrack(cardTrack)}
              />
            ) : (
              <PlayIcon
                height="3rem"
                onClick={() => playPauseTrack(cardTrack)}
              />
            )}
          </div>
          <div>
            <div className="font-bold">{cardTrack.author.name}</div>
            {cardTrack.fileName}
          </div>
        </div>
      </div>
    );
  };

  const PlaylistTracksCard = () => (
    <div className="surface-card shadow-1 border-round my-4 py-6 overflow-y-auto">
      <div className="container">
        <h1 className="my-0">Sample Flip Challenge {playlist.sampleflipId}</h1>
        <p className="">
          Created at: {format(new Date(playlist.date), "yyyy-MM-dd")}
        </p>
        <h2>Tracks</h2>
        <div className="flex flex-column" style={{ gap: 15 }}>
          {tracks.map((track: any) => (
            <TrackCard key={track.id} cardTrack={track} />
          ))}
        </div>
      </div>
    </div>
  );

  const PlaylistCoverBox = () => (
    <div className="relative">
      <div className="container">
        <p
          className="absolute z-2 bottom-0 mb-5 text-5xl font-semibold"
          style={{ color: "white" }}
        >
          {playlist.name}
        </p>
      </div>
      <div className="h-13rem relative shadow-2 border-round">
        <div
          className="z-1 absolute h-full w-full border-round"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.6) 140%)",
          }}
        ></div>
        {playlist.covers[0] && (
          <Image
            src={`${AMAZON_URL}/${playlist.sampleflipId}/${playlist.covers[0].fileName}`}
            layout="fill"
            objectFit="cover"
            alt="cover"
            className="border-round"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex w-full">
      <div className="w-24rem">
        <ContextMenu playlists={playlists} tracks={tracks} />
      </div>

      <div className="flex flex-column flex-1">
        <div className="flex flex-column h-screen">
          <div className="flex align-items-end h-1rem pl-2 pr-5">
            <div className="text-4xl font-bold text-primary uppercase">
              {/* <div>
                <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText defaultValue="" placeholder="Search" />
                </span>
              </div> */}
            </div>
          </div>
          <div className="flex flex-column flex-1 pl-2 pt-3 pr-5 overflow-y-auto">
            <PlaylistCoverBox />
            <PlaylistTracksCard />
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
      playlist: JSON.parse(
        JSON.stringify(
          playlists.find(
            (playlist: Playlist) => playlist.id === context.params!.id
          )
        )
      ),
      tracks: JSON.parse(JSON.stringify(tracks)),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const playlists = await prisma.playlist.findMany();
  const paths: any[] = playlists.map((playlist) => {
    return {
      params: { id: playlist.id },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default Playlist;
