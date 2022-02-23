import PlaylistCard from "./PlaylistCard";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Playlist } from "@prisma/client";

const ContextMenu = ({ playlists, tracks }: any): JSX.Element => {
  return (
    <div className="flex flex-column h-screen">
      <div className="flex align-items-end h-4rem px-5 mb-5">
        <div className="text-3xl font-bold text-primary uppercase">
          Playlists
        </div>
      </div>

      <div className="flex flex-column flex-1 overflow-y-auto px-5 pt-1">
        <div className="border-round p-3 surface-card shadow-1">
          <div className="flex justify-content-between align-items-center">
            <span className="text-2xl font-bold">Overview</span>
            <span>
              <Link href="/">
                <a className="flex align-self-end align-items-center font-bold text-sm uppercase">
                  View more <ArrowSmRightIcon width="1.6rem" />
                </a>
              </Link>
            </span>
          </div>
          <div className="flex text-sm justify-content-between uppercase mt-2">
            <span style={{ backgroundColor: "var(--surface-0)" }}>
              Playlists
            </span>
            <span className="font-bold">{playlists.length}</span>
          </div>
        </div>

        <div className="">
          {playlists
            .sort(
              (a: Playlist, b: Playlist) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((playlist: any) => (
              <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                <a>
                  <PlaylistCard playlist={playlist} tracks={tracks} />
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
