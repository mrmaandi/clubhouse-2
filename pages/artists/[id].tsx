import { PrismaClient, User } from "@prisma/client";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import React from "react";
import ContextMenu from "../../components/contextmenu/ContextMenu";
import ContextMenuArtists from "../../components/contextmenu/ContextMenuArtists";
import TrackCard from "../../components/TrackCard";

const prisma = new PrismaClient();

interface PageProps {
  artist: User,
  artists: UserExtended[],
  tracks: TrackExtended[]
}

const Artist = ({ artist, artists, tracks }: PageProps) => {
  const ArtistTracksCard = () => (
    <div className="surface-card shadow-1 border-round my-4 py-6">
      <div className="container">
        <h1 className="my-0">{artist.name}</h1>
        <p className="">Total tracks: {tracks.length}</p>
        <h2>Tracks</h2>
        <div className="flex flex-wrap flex-column" style={{ gap: 15 }}>
          {tracks.map((track: TrackExtended) => (
            <TrackCard
              key={track.id}
              cardTrack={track}
              tracks={tracks}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-column w-24rem">
        <ContextMenu title="Artists">
          <ContextMenuArtists artists={artists} />
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
            <ArtistTracksCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const artists = await prisma.user.findMany({ include: { _count: { select: { tracks: true } } }});

  const artist = await prisma.user.findUnique({
    where: {
      id: context.params!.id as string,
    },
  });

  const tracks = await prisma.track.findMany({
    where: {
      authorId: context.params!.id as string,
    },
    include: { playlist: { include: { covers: true } } },
  });

  const tracksWithAuthor = tracks.map((track) => { return {...track, author: artist }})

  return {
    props: {
      artist: JSON.parse(JSON.stringify(artist)),
      artists: JSON.parse(JSON.stringify(artists)),
      tracks: JSON.parse(JSON.stringify(tracksWithAuthor)),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await prisma.user.findMany();
  const paths: any[] = artists.map((artist) => {
    return {
      params: { id: artist.id },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default Artist;
