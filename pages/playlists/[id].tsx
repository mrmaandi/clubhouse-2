import { Playlist, PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Image from "next/image";
import React from "react";
import ContextMenu from "../../components/contextmenu/ContextMenu";
import ContextMenuPlaylists from "../../components/contextmenu/ContextMenuPlaylists";
import TrackCard from "../../components/TrackCard";
import { AMAZON_URL } from "../_app";

const prisma = new PrismaClient();

interface PageProps {
  playlists: PlaylistExtended[];
  playlist: PlaylistExtended;
  tracks: TrackExtended[];
}

const Playlist = ({ playlists, playlist, tracks }: PageProps) => {
  const PlaylistTracksCard = () => (
    <div className="surface-card shadow-1 border-round my-4 py-6">
      <div className="container">
        <h1 className="my-0">Sample Flip Challenge {playlist.sampleflipId}</h1>
        <p className="">
          Created at: {format(new Date(playlist.date), "yyyy-MM-dd")}
        </p>
        <h2>Tracks</h2>
        <div className="flex flex-wrap flex-column" style={{ gap: 15 }}>
          {tracks.map((track: TrackExtended) => (
            <TrackCard key={track.id} cardTrack={track} tracks={tracks} />
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
    <div className="flex flex-wrap w-full">
      <div className="flex flex-column w-24rem">
        <ContextMenu title="Playlists">
          <ContextMenuPlaylists playlists={playlists} tracks={tracks} />
        </ContextMenu>
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
          <div className="flex flex-column flex-1 pl-2 pt-3 pb-8 pr-5 overflow-y-auto">
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

  const playlist = playlists.find(
    (playlist: Playlist) => playlist.id === context.params!.id
  );

  const tracksWithPlaylist = tracks.map((track) => {
    return { ...track, playlist: playlist };
  });

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
      playlist: JSON.parse(JSON.stringify(playlist)),
      tracks: JSON.parse(JSON.stringify(tracksWithPlaylist)),
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
