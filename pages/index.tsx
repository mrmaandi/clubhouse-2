import { PrismaClient } from "@prisma/client";
import type { NextPage } from "next";
import ContextMenu from "../components/ContextMenu";

const prisma = new PrismaClient();

const Home: NextPage = ({ playlists }: any) => {
  return (
    <div className="flex">
      <div
        className="p-4 w-23rem overflow-y-auto"
        style={{ height: "calc(100vh - 10rem - 2px)" }}
      >
        <ContextMenu playlists={playlists} />
      </div>
      <div
        className="flex flex-1 border-left-2 border-200"
        style={{ backgroundColor: "var(--surface-0)" }}
      >
        <div className="w-full h-full">Welcome!</div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const playlists = await prisma.playlist.findMany({
    include: { covers: true, _count: { select: { tracks: true }, } },
  });

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
    },
  };
}

export default Home;
