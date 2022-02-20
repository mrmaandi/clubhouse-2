import type { NextPage } from "next";
import ContextMenu from "../components/ContextMenu";

const Home: NextPage = ({ playlists }: any) => {
  return (
    <div className="flex">
      <div
        className="p-4 w-23rem overflow-y-scroll"
        style={{ height: "calc(100vh - 10rem - 2px)" }}
      >
        <ContextMenu playlists={playlists} />
      </div>
      <div
        className="flex flex-1 border-left-2 border-200"
        style={{ backgroundColor: "var(--surface-0)" }}
      >
        <div className="w-full h-full overflow-y-auto">test</div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const playlists = [
    {
      id: 1,
      name: "Say You",
      date: new Date(),
      image: "kqrgm3h.png"
    },
    {
      id: 2,
      name: "Say You2",
      date: new Date(),
      image: "NH7E7Yb.png"
    }
  ];

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
    },
  };
}

export default Home;
