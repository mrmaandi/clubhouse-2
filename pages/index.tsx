import { PrismaClient } from "@prisma/client";
import type { NextPage } from "next";
import ContextMenu from "../components/ContextMenu";

const prisma = new PrismaClient();

const Home: NextPage = ({ playlists }: any) => {
  return (
    <div className="flex">
      <div
        className="flex p-4 w-23rem"
      >
        <ContextMenu playlists={playlists} />
      </div>
      <div className="flex flex-1">
        <div className="flex flex-column">
          <div className="w-full"><h2>Search</h2></div>
          <div
            className="flex flex-1 h-full"
            style={{ backgroundColor: "var(--surface-0)" }}
          >
            Welcome!
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const playlists = await prisma.playlist.findMany({
    include: { covers: true, _count: { select: { tracks: true } } },
  });

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
    },
  };
}

export default Home;
